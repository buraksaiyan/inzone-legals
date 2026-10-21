"""Dependency-free checks for the published static site's branding and links."""

import json
from html.parser import HTMLParser
from pathlib import Path
import re
import unittest
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
PAGES = ["index.html", "PRIVACY_POLICY.html", "EULA.html",
         "account-deletion.html", "open/index.html", "404.html"]


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.tags = []
        self.text = []
        self.skip = 0
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))
        if tag in ("script", "style"):
            self.skip += 1

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self.skip -= 1

    def handle_data(self, value):
        if not self.skip:
            self.text.append(value)


class SiteTests(unittest.TestCase):
    def test_health_privacy_disclosures_match_source(self):
        markdown = (ROOT / "PRIVACY_POLICY.md").read_text()
        html = (ROOT / "PRIVACY_POLICY.html").read_text()
        health = markdown.split("### Optional Apple Health Activity\n\n", 1)[1].split("\n---", 1)[0]
        paragraphs = health.strip().split("\n\n")
        self.assertEqual(len(paragraphs), 3)
        for paragraph in paragraphs:
            self.assertIn(f"<p>{paragraph}</p>", html)
        for disclosure in (
            "read-only access to steps, walking and running distance, and workouts",
            "they are not saved or uploaded",
            "With your separate agreement to save movement history",
            "Only the resulting daily Physical XP total and its date",
            "You can also revoke permissions in Apple Health",
        ):
            self.assertIn(disclosure, health)
        recovery = next(p for p in markdown.split("\n\n") if p.startswith("To prevent accidental loss"))
        self.assertIn("Movement details imported from Apple Health are excluded", recovery)
        self.assertIn(f"<p>{recovery}</p>", html)
        self.assertIn("**Effective Date:** July 13, 2026", markdown)
        self.assertIn("<strong>Effective Date:</strong> July 13, 2026", html)

    def test_rebrand(self):
        for filename in PAGES:
            with self.subTest(page=filename):
                page = Page((ROOT / filename).read_text())
                text = " ".join(page.text)
                text = text.replace("feedback@1inzone.app", "").replace("com.inzoneapp.inzone", "")
                self.assertIn("RiseArc", text)
                self.assertNotRegex(text, r"(?i)\binzone\b")
                self.assertNotIn("pending review", text)

    def test_local_references_and_fragments(self):
        for filename in PAGES:
            page = Page((ROOT / filename).read_text())
            ids = [attrs["id"] for _, attrs in page.tags if "id" in attrs]
            self.assertEqual(len(ids), len(set(ids)), filename)
            for tag, attrs in page.tags:
                for attr in ("src", "href"):
                    value = attrs.get(attr, "")
                    url = urlsplit(value)
                    if not value or url.scheme or url.netloc:
                        continue
                    if not url.path and url.fragment:
                        self.assertIn(url.fragment, ids, (filename, value))
                        continue
                    path = unquote(url.path).lstrip("/")
                    target = ROOT / path if value.startswith("/") else ROOT / filename / ".." / path
                    if target.is_dir():
                        target /= "index.html"
                    self.assertTrue(target.is_file(), (filename, tag, value))
                    # Case-sensitive membership catches macOS-only path successes.
                    self.assertIn(target.name, [p.name for p in target.parent.iterdir()])

    def test_store_and_support_identities(self):
        home = (ROOT / "index.html").read_text()
        for value in ("https://1inzone.app/", "feedback@1inzone.app",
                      "https://apps.apple.com/app/id6789995346",
                      "https://play.google.com/store/apps/details?id=com.inzoneapp.inzone"):
            self.assertIn(value, home)
        self.assertTrue((ROOT / ".nojekyll").is_file())
        android = json.loads((ROOT / ".well-known/assetlinks.json").read_text())
        self.assertTrue(any(item["target"].get("package_name") == "com.inzoneapp.inzone" for item in android))
        apple = json.loads((ROOT / ".well-known/apple-app-site-association").read_text())
        self.assertIn("com.inzoneapp.inzone", json.dumps(apple))

    def test_manifest_and_structured_data(self):
        manifest = json.loads((ROOT / "site.webmanifest").read_text())
        self.assertEqual(manifest["short_name"], "RiseArc")
        self.assertEqual(manifest["icons"][0]["sizes"], "512x512")
        self.assertTrue((ROOT / manifest["icons"][0]["src"].lstrip("/")).is_file())
        dom = (ROOT / "index.html").read_text()
        data = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>', dom, re.S)[1])
        self.assertTrue(all("RiseArc" in entry["name"] for entry in data["@graph"]))
        sitemap = ET.parse(ROOT / "sitemap.xml")
        for url in sitemap.getroot():
            expected = "2026-10-21" if url.find("{*}loc").text.endswith("/PRIVACY_POLICY.html") else "2026-10-07"
            self.assertEqual(url.find("{*}lastmod").text, expected)


if __name__ == "__main__":
    unittest.main()
