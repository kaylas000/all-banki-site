/* ------------------------------------------------------------------ */
/* Все Банки — Логика калькулятора, анимации и мультилендинга         */
/* ------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  const amountRange = document.getElementById("amountRange");
  const monthsRange = document.getElementById("monthsRange");
  const amountVal = document.getElementById("amountVal");
  const monthsVal = document.getElementById("monthsVal");
  const calcResult = document.getElementById("calcResult");

  function updateCalc() {
    if (!amountRange || !monthsRange || !calcResult) return;

    const amount = parseInt(amountRange.value, 10);
    const months = parseInt(monthsRange.value, 10);

    amountVal.textContent = amount.toLocaleString("ru-RU") + " ₽";
    monthsVal.textContent = months + " мес";

    const monthlyRate = 0.185 / 12;
    const payment = Math.round((amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months)));

    calcResult.textContent = payment.toLocaleString("ru-RU") + " ₽/мес";
  }

  if (amountRange && monthsRange) {
    amountRange.addEventListener("input", updateCalc);
    monthsRange.addEventListener("input", updateCalc);
    updateCalc();
  }

  // Волновой индикатор ставок
  const canvas = document.getElementById("rateCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let frame = 0;

    function renderWave() {
      if (!ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = "#e0a91c";
      ctx.lineWidth = 3;

      for (let x = 0; x < w; x += 5) {
        const y = h / 2 + Math.sin((x + frame * 3) * 0.02) * 25 + Math.cos((x - frame) * 0.01) * 10;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      frame++;
      requestAnimationFrame(renderWave);
    }

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isReduced) {
      renderWave();
    }
  }

  // MultiLanding URL parameters
  const params = new URLSearchParams(window.location.search);
  const term = params.get("utm_term");
  if (term) {
    const decoded = decodeURIComponent(term).replace(/-/g, " ");
    const capitalized = decoded.charAt(0).toUpperCase() + decoded.slice(1);
    const titleEl = document.querySelector(".mega-title");
    if (titleEl) {
      titleEl.textContent = capitalized;
    }
  }
});
