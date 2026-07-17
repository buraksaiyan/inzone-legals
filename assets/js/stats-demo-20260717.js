(() => {
  const inputs = [...document.querySelectorAll('.stat-box-grid input[type="range"]')];
  const polygon = document.querySelector('#demo-radar-fill');
  const radar = document.querySelector('.radar');
  const overall = document.querySelector('#demo-overall');
  const overallCard = document.querySelector('#demo-overall-card');
  const infoButton = document.querySelector('#stats-info-button');
  const infoPanel = document.querySelector('#stats-info-panel');
  const infoClose = document.querySelector('#stats-info-close');
  const chartLabels = [...document.querySelectorAll('.chart-label')];
  if (!inputs.length || !polygon || !radar || !overall || !overallCard) return;

  const center = 140;
  const radius = 108;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let displayedPoints = valuesToPoints(inputs.map((input) => Number(input.value)));
  let frame = 0;

  function valuesToPoints(values) {
    return values.map((value, index) => {
      const angle = -Math.PI / 2 + index * ((Math.PI * 2) / values.length);
      const distance = radius * (value / 99);
      return [center + Math.cos(angle) * distance, center + Math.sin(angle) * distance];
    });
  }

  function pointsAttribute(points) {
    return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  }

  function rgba(hex, alpha) {
    const value = hex.replace('#', '');
    const number = Number.parseInt(value, 16);
    return `rgba(${number >> 16},${(number >> 8) & 255},${number & 255},${alpha})`;
  }

  function animateTo(target) {
    cancelAnimationFrame(frame);
    if (reducedMotion) {
      displayedPoints = target;
      polygon.setAttribute('points', pointsAttribute(target));
      return;
    }
    const start = displayedPoints.map((point) => [...point]);
    const startedAt = performance.now();
    const duration = 260;
    const tick = (now) => {
      const elapsed = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      displayedPoints = start.map(([x, y], index) => [
        x + (target[index][0] - x) * eased,
        y + (target[index][1] - y) * eased,
      ]);
      polygon.setAttribute('points', pointsAttribute(displayedPoints));
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }

  function selectOverall() {
    radar.classList.add('overall-mode');
    overallCard.classList.add('selected');
    inputs.forEach((input) => input.closest('.stat-box')?.classList.remove('selected'));
    chartLabels.forEach((label) => label.classList.remove('active'));
  }

  function update(activeInput) {
    const values = inputs.map((input) => Number(input.value));
    inputs.forEach((input) => {
      const output = document.querySelector(`output[for="${input.id}"]`);
      if (output) output.value = input.value;
      const chartValue = document.querySelector(`[data-chart-value="${input.dataset.stat}"]`);
      if (chartValue) chartValue.textContent = input.value;
      const xp = document.querySelector(`[data-xp="${input.dataset.stat}"]`);
      if (xp) xp.textContent = Number(input.value) >= 99 ? '9900 XP · Max rating' : `${Number(input.value) * 100 + 50} XP · 50 to next`;
    });
    const overallValue = Math.floor(values.reduce((sum, value) => sum + value, 0) / values.length);
    overall.textContent = String(overallValue);
    const overallFill = overallCard.querySelector('.stat-track i');
    if (overallFill) overallFill.style.width = `${overallValue}%`;
    if (activeInput) {
      const color = activeInput.dataset.color;
      radar.classList.remove('overall-mode');
      radar.style.setProperty('--active-accent', color);
      radar.style.setProperty('--active-fill', rgba(color, 0.14));
      overallCard.classList.remove('selected');
      inputs.forEach((input) => input.closest('.stat-box')?.classList.toggle('selected', input === activeInput));
      chartLabels.forEach((label) => label.classList.toggle('active', label.dataset.target === activeInput.id));
    }
    animateTo(valuesToPoints(values));
  }

  inputs.forEach((input) => {
    input.addEventListener('input', () => update(input));
    input.addEventListener('focus', () => update(input));
    input.addEventListener('pointerdown', () => update(input));
  });
  chartLabels.forEach((label) => label.addEventListener('click', () => document.querySelector(`#${label.dataset.target}`)?.focus()));
  overallCard.addEventListener('click', selectOverall);
  infoButton?.addEventListener('click', () => {
    if (!infoPanel) return;
    infoPanel.hidden = false;
    infoButton.setAttribute('aria-expanded', 'true');
    infoClose?.focus();
  });
  infoClose?.addEventListener('click', () => {
    if (!infoPanel) return;
    infoPanel.hidden = true;
    infoButton?.setAttribute('aria-expanded', 'false');
    infoButton?.focus();
  });
  update();
  selectOverall();
})();
