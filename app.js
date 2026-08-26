/* ------------------------------------------------------------------ */
/* Все Банки — SOTA 2026 Interactive Portal Engine & Video Player     */
/* ------------------------------------------------------------------ */

class BankCodeVideoEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.frame = 0;
    this.fps = 60;
    this.particles = [];
    this.init();
  }

  init() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.particles = Array.from({ length: 300 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: 1.5 + Math.random() * 2.5,
      hue: Math.random() < 0.2 ? 35 : 210
    }));
  }

  renderFrame() {
    const ctx = this.ctx;
    if (!ctx) return;

    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.fillStyle = "rgba(15, 14, 10, 0.22)";
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = "rgba(224, 169, 28, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // Kinetic Wave
    ctx.beginPath();
    ctx.strokeStyle = "#e0a91c";
    ctx.lineWidth = 3;

    for (let x = 0; x < w; x += 4) {
      const y = h / 2 + 
        Math.sin((x + this.frame * 2.5) * 0.015) * 35 + 
        Math.cos((x * 0.5 - this.frame) * 0.02) * 15;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Particles
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.fillStyle = p.hue === 35 ? "rgba(224, 169, 28, 0.85)" : "rgba(29, 58, 95, 0.75)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Telemetry Text
    ctx.font = "700 11px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(224, 169, 28, 0.9)";
    ctx.fillText(`CODE-VIDEO FRAME #${String(this.frame).padStart(4, "0")} · 60 FPS`, 16, 24);
    ctx.fillText(`TIME VIRTUALIZATION ENGINE (SK-16)`, 16, 40);

    this.frame++;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Управление HTML5 Видеоплеером
  const heroVideo = document.getElementById("heroVideo");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const muteBtn = document.getElementById("muteBtn");

  if (heroVideo && playPauseBtn) {
    playPauseBtn.addEventListener("click", () => {
      if (heroVideo.paused) {
        heroVideo.play();
        playPauseBtn.textContent = "⏸ Пауза";
      } else {
        heroVideo.pause();
        playPauseBtn.textContent = "▶ Воспроизвести";
      }
    });
  }

  if (heroVideo && muteBtn) {
    muteBtn.addEventListener("click", () => {
      if (heroVideo.muted) {
        heroVideo.muted = false;
        muteBtn.textContent = "🔇 Выключить Звук";
      } else {
        heroVideo.muted = true;
        muteBtn.textContent = "🔊 Включить Звук";
      }
    });
  }

  // 2. Табы фильтрации
  const tabBtns = document.querySelectorAll(".tab-btn");
  const cardItems = document.querySelectorAll(".card-item");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const cat = btn.getAttribute("data-cat");

      cardItems.forEach((card) => {
        const cardCat = card.getAttribute("data-category");
        if (cat === "all" || cardCat === cat) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 3. Интерактивный калькулятор
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

  // 4. Модальное окно
  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");
  const modalOkBtn = document.getElementById("modalOkBtn");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const openModalBtns = document.querySelectorAll(".open-modal-btn");

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove("active");
      modalOverlay.setAttribute("aria-hidden", "true");
    }
  }

  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const title = btn.getAttribute("data-title") || "Условия продукта";
      const desc = btn.getAttribute("data-desc") || "Информация о продукте.";

      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.textContent = desc;

      if (modalOverlay) {
        modalOverlay.classList.add("active");
        modalOverlay.setAttribute("aria-hidden", "false");
      }
    });
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalOkBtn) modalOkBtn.addEventListener("click", closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // 5. Запуск Code-Video Canvas Engine
  const canvas = document.getElementById("rateCanvas");
  if (canvas) {
    const videoEngine = new BankCodeVideoEngine(canvas);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function loop() {
      videoEngine.renderFrame();
      if (!isReduced) {
        requestAnimationFrame(loop);
      }
    }

    loop();
  }

  // 6. MultiLanding
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
