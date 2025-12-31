# Privacy Policy for inzone

**Last Updated:** December 31, 2025

**Effective Date:** December 31, 2025

This Privacy Policy describes how inzone ("we," "us," or "our") collects, uses, and protects your personal information when you use our mobile application ("App"). By using the App, you agree to the collection and use of information in accordance with this policy.

---

## 1. Information We Collect

### 1.1 Account Information
When you create an account, we collect:
- **Email address** – Used for account authentication, password recovery, and essential communications
- **Username** – Your chosen display name within the App
- **Profile data** – Including your timezone setting for accurate streak calculations

### 1.2 Authentication Data
- **Google Sign-In data** – If you choose to sign in with Google, we receive basic profile information (email, name) from Google OAuth. We do not access your Google contacts, calendar, or any other Google services.

### 1.3 App Usage Data
To provide our core functionality of helping you track progress, we collect:
- **Focus sessions** – Duration, mode (e.g., deep focus, pomodoro, meditation, body), completion status, and timestamps
- **Goals** – Titles, descriptions, progress, deadlines, and completion status
- **Habits** – Titles, frequencies, completion logs, and streak data
- **To-Do items** – Task titles, descriptions, priorities, due dates, and completion status
- **Journal entries** – Your personal journal content (stored securely and never accessed by us)
- **Achievements** – Badges and milestones you've unlocked

### 1.4 Gamification Data
To power our productivity system, we store:
- **Points and scores** – Total, monthly, and weekly points earned
- **Ranks and zones** – Your current rank and progression zone
- **Streaks** – App usage streak data
- **Leaderboard data** – Your position relative to other users (username only, no personal data shared)

### 1.5 Subscription Information
- Subscription tier – Whether you are on a free or premium plan (e.g., Free, Monthly Focus, Monthly Premium, Founders Edition)
- Subscription status – Active/inactive status and expiration dates
- Payment information – Handled entirely by the Google Play Store or Apple App Store. We never see or store your payment card details.

### 1.6 Device Permissions
The App requests the following permissions:
- **Notifications** – To send you focus session reminders, achievement alerts, and streak notifications. You can disable these in your device settings.
- **Do Not Disturb Access** (Android) – To optionally enable Do Not Disturb mode during focus sessions. This is entirely optional and user-initiated.

### 1.7 Technical Data
We may automatically collect:
- **Device information** – Device type, operating system version (for compatibility purposes only)
- **App version** – To ensure you have the latest features and security updates
- **Crash reports** – Anonymous error logs to help us fix bugs and improve stability

### 1.8 Advertising and Third-Party Data Collection

**AdMob Disclosure:** The App displays ads on its free tier through the Google Mobile Ads SDK (AdMob), a service provided by Google.

- **Data Collected:** AdMob collects Device Identifiers (such as the Android Advertising ID), IP Address, and information about your device and app usage.
- **Purpose:** This data is primarily used by Google for serving personalized advertisements, measuring ad performance, and critically, detecting and preventing ad fraud and invalid traffic.
- **User Choice:** You can control the use of the Advertising ID for personalized advertising via your device's operating system settings.

---

## 2. How We Use Your Information

We use your information solely to:

| Purpose | Data Used |
|---------|-----------|
| Provide core app functionality | Focus sessions, goals, habits, to-dos, journals |
| Track and display your progress | Points, ranks, zones, streaks, achievements |
| Enable leaderboards | Username and weekly/monthly points (anonymized) |
| Process subscriptions | Subscription tier and status |
| Send notifications | Push notification tokens |
| Improve the App | Anonymous crash reports and usage patterns |
| Authenticate your account | Email, password hash, Google OAuth tokens |
| Respond to support requests | Email address and inquiry content |
| Display advertisements (free tier) | Advertising ID, IP address, device info (via AdMob) |

### What We Do NOT Do
- ❌ We do **NOT** sell your personal data to third parties, except as necessary to provide core services (e.g., AdMob for ad delivery and fraud prevention).
- ❌ We do **NOT** use your personal content (journals, goals, etc.) for targeted advertising.

---

## 3. Data Storage and Security

### 3.1 Storage Location
Your data is stored on:
- **Supabase** – A secure, enterprise-grade cloud database platform hosted on AWS infrastructure
- **Local device storage** – Cached data for offline access (encrypted via system-level security)

### 3.2 Security Measures
We implement industry-standard security practices:
- 🔐 All data transmitted between your device and our servers is encrypted using TLS/SSL
- 🔐 Passwords are never stored in plain text – they are salted and hashed
- 🔐 Authentication tokens are securely stored using Expo SecureStore
- 🔐 Row-Level Security (RLS) policies ensure you can only access your own data
- 🔐 PKCE (Proof Key for Code Exchange) flow for OAuth authentication

### 3.3 Data Retention
- Your data is retained as long as your account is active
- Deleted data is removed from our active databases within 30 days
- Backup copies may persist for up to 90 days for disaster recovery purposes
- You may request complete data deletion at any time (see Section 6)

---

## 4. Third-Party Services

We use the following third-party services:

| Service | Purpose | Data Shared |
|---------|---------|-------------|
| **Supabase** | Database and authentication | Account data, usage data |
| **Google Sign-In** | Optional authentication | Email, name (from Google) |
| **Google Play Store / Apple App Store** | Subscription processing | Payment handled by stores |
| **Google AdMob (Google Mobile Ads SDK)** | Advertising (free tier only) | Advertising ID (AAID), IP address, device info |
| **Expo** | App development platform | Anonymous crash reports |

### 4.1 Google AdMob Disclosure

**For free tier users**, we display advertisements using **Google AdMob (Google Mobile Ads SDK)**. AdMob is operated by Google LLC and collects the following data:

- **Android Advertising ID (AAID)** – A unique identifier for advertising purposes
- **IP Address** – Used for approximate geographic location and fraud prevention
- **Device Information** – Device model, operating system, screen dimensions
- **Usage Data** – Ad views, clicks, and interaction metrics

**Purpose of Data Collection by AdMob:**
- Serving advertisements
- Measuring ad performance and campaign effectiveness
- Fraud detection and prevention
- Reporting and analytics

**Your Choices:**
- You can reset your Advertising ID in your device settings
- You can opt out of personalized advertising in your device settings
- **Premium subscribers do not see ads** and this data is not collected for them

For more information, see [Google's Privacy Policy](https://policies.google.com/privacy) and [How Google Uses Data](https://policies.google.com/technologies/partner-sites).

### 4.2 Other Third-Party Services

Each third-party service has its own privacy policy:
- [Supabase Privacy Policy](https://supabase.com/privacy)
- [Google Privacy Policy](https://policies.google.com/privacy)
- [Apple Privacy Policy](https://www.apple.com/legal/privacy/)
- [Expo Privacy Policy](https://expo.dev/privacy)

We do not sell or transfer your data to any third parties for purposes unrelated to providing our services.

---

## 5. Children's Privacy

The App is not intended for children under the age of 13 (or the applicable age of digital consent in your jurisdiction). We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately, and we will delete such information.

---

## 6. Your Rights and Choices

You have the following rights regarding your data:

### 6.1 Access Your Data
- View all your data within the App (Profile, History, Settings)
- Request a copy of your data by contacting us at **feedback@1inzone.app**

### 6.2 Correct Your Data
- Edit your profile, goals, habits, and other data directly in the App
- Update your email or username in the App's Settings screen

### 6.3 Delete Your Data
- **Delete individual items** – Remove specific goals, habits, to-dos, or journal entries directly in the App.
- **Delete your account** – You can permanently delete your account and all associated data instantly by using the **"Delete Account"** option in the App's Settings.
- **Request deletion via email** – If you cannot access the App, you may request complete account deletion by contacting us at **feedback@1inzone.app** or visiting our privacy page. We will process these requests within 7 days.

### 6.4 Opt-Out Options
- **Push notifications** – Disable in your device's notification settings
- **Do Not Disturb** – Revoke permission in your device settings
- **Personalized Ads** – Opt out via your device settings (Settings > Google > Ads)
- **Google Sign-In** – Use email/password registration instead

### 6.5 For EU/EEA Residents (GDPR)
If you are located in the European Union or European Economic Area, you have additional rights:
- Right to erasure ("right to be forgotten")
- Right to restrict processing
- Right to data portability
- Right to object to processing
- Right to lodge a complaint with a supervisory authority

### 6.6 For California Residents (CCPA)
If you are a California resident, you have the right to:
- Know what personal information we collect
- Request deletion of your personal information
- Opt-out of the sale of personal information (note: we do NOT sell your data)
- Non-discrimination for exercising your privacy rights

---

## 7. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. Changes will be:
- Posted within the App and on our website
- Effective immediately upon posting (with the "Last Updated" date revised)
- Communicated via in-app notification for significant changes

We encourage you to review this Privacy Policy periodically. Continued use of the App after changes constitutes acceptance of the updated policy.

---

## 8. Data Processing Basis (GDPR)

For users in the EU/EEA, we process your data based on:
- **Contract performance** – To provide the services you signed up for
- **Legitimate interests** – To improve and secure our App
- **Consent** – For optional features like notifications (which you can withdraw at any time)

---

## 9. International Data Transfers

Your data may be transferred to and processed in countries other than your own, including the United States (where our infrastructure providers operate). We ensure appropriate safeguards are in place to protect your data in compliance with applicable laws.

---

## 10. Contact Us

If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:

**Email:** feedback@1inzone.app

**Developer:** Individual Developer (not a registered business entity)

We aim to respond to all inquiries within 30 days.

---

## 11. Consent

By using the inzone App, you consent to:
- The collection and use of your information as described in this Privacy Policy
- The storage of your data on secure cloud servers
- Receiving essential account-related communications

---

*This Privacy Policy is provided in good faith and designed to be transparent about our data practices. If you do not agree with any part of this policy, please discontinue use of the App and contact us to request data deletion.*

