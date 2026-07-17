(() => {
  const inputs = [...document.querySelectorAll('.stat-controls input[type="range"]')];
  const polygon = document.querySelector('#demo-radar-fill');
  const radar = document.querySelector('.radar');
  const overall = document.querySelector('#demo-overall');
  const strongest = document.querySelector('#demo-strongest');
  if (!inputs.length || !polygon || !radar || !overall || !strongest) return;

  const center = 110;
  const radius = 100;
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

  function update(activeInput) {
    const values = inputs.map((input) => Number(input.value));
    inputs.forEach((input) => {
      const output = document.querySelector(`output[for="${input.id}"]`);
      if (output) output.value = input.value;
    });
    overall.textContent = String(Math.floor(values.reduce((sum, value) => sum + value, 0) / values.length));
    const strongestIndex = values.indexOf(Math.max(...values));
    strongest.textContent = `${inputs[strongestIndex].dataset.stat} ${values[strongestIndex]}`;
    if (activeInput) {
      const color = activeInput.dataset.color;
      radar.style.setProperty('--active-accent', color);
      radar.style.setProperty('--active-fill', rgba(color, 0.14));
    }
    animateTo(valuesToPoints(values));
  }

  inputs.forEach((input) => {
    input.addEventListener('input', () => update(input));
    input.addEventListener('focus', () => update(input));
    input.addEventListener('pointerdown', () => update(input));
  });
  update(inputs[0]);
})();
