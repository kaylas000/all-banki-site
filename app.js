/* ------------------------------------------------------------------ */
/* Все Банки — SOTA 2026 Interactive Portal & SK-06 Intro Engine      */
/* ------------------------------------------------------------------ */

// 🎬 КИНОЗАСТАВКА ПЕРЕД САЙТОМ (SK-06 / INTRO ENGINE)
class BankIntroEngine {
  constructor(canvas, onDone) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.onDone = onDone;
    this.frame = 0;
    this.totalFrames = 204; // 3.4s при 60 FPS по стандарту SK-06
    this.fps = 60;
    this.isPlaying = true;
    this.particles = [];
    this.soundOn = false;
    this.ac = null;

    this.init();
  }

  init() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    // Формируем частицы, слетающиеся из хаоса в слово "ВСЕ БАНКИ"
    this.particles = Array.from({ length: 1200 }, () => ({
      sx: (Math.random() - 0.5) * w * 2 + w / 2,
      sy: (Math.random() - 0.5) * h * 2 + h / 2,
      tx: w / 2 + (Math.random() - 0.5) * w * 0.6,
      ty: h / 2 + (Math.random() - 0.5) * h * 0.2,
      size: 1.2 + Math.random() * 2.5,
      delay: Math.random() * 0.4,
      color: Math.random() < 0.3 ? "#e0a91c" : "#e8e6de"
    }));
  }

  start() {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("allbanki-intro-seen") === "1";

    if (isReduced || seen) {
      this.finish();
      return;
    }

    this.loop();
  }

  loop = () => {
    if (!this.isPlaying) return;

    const p = this.frame / this.totalFrames;
    this.draw(p);

    this.frame++;

    if (this.frame >= this.totalFrames) {
      this.finish();
      return;
    }

    requestAnimationFrame(this.loop);
  };

  draw(p) {
    const ctx = this.ctx;
    if (!ctx) return;

    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.fillStyle = "#0f0e0a";
    ctx.fillRect(0, 0, w, h);

    // Сетка кинозаставки
    ctx.strokeStyle = "rgba(232,230,222,0.045)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 56) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }

    if (p < 0.15) {
      // Фаза Загрузки
      ctx.font = "700 14px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(232, 230, 222, 0.6)";
      ctx.textAlign = "center";
      ctx.fillText("ЗАГРУЗКА РЕЕСТРА СТАВОК БАНКОВ...", w / 2, h * 0.5);
    } else {
      // Фаза Сборки из частиц
      const mp = (p - 0.15) / 0.85;
      this.particles.forEach((pt) => {
        const local = Math.min(1, Math.max(0, (mp - pt.delay) / (1 - pt.delay)));
        const e = (local >= 1) ? 1 : 1 - Math.pow(2, -10 * local); // easeOutExpo
        const curX = pt.sx + (pt.tx - pt.sx) * e;
        const curY = pt.sy + (pt.ty - pt.sy) * e;

        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(curX, curY, pt.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Главный заголовок кинозаставки
      if (mp > 0.4) {
        ctx.font = "900 64px 'Russo One', sans-serif";
        ctx.fillStyle = "#e0a91c";
        ctx.textAlign = "center";
        ctx.fillText("ВСЕ БАНКИ", w / 2, h / 2 - 10);

        ctx.font = "700 16px 'JetBrains Mono', monospace";
        ctx.fillStyle = "#e8e6de";
        ctx.fillText("ФИНАНСОВЫЙ ПОРТАЛ · ПРЕМЬЕРА 2026", w / 2, h / 2 + 35);
      }
    }

    // Титры кадра
    ctx.font = "700 11px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(122,118,106,0.9)";
    ctx.textAlign = "left";
    ctx.fillText(`КАДР ${String(Math.min(120, Math.round(p * 120))).padStart(3, "0")}/120`, 24, h - 34);
    ctx.fillText(`КИНОЗАСТАВКА SK-06 (M-11)`, 24, h - 18);
  }

  skip() {
    this.finish();
  }

  finish() {
    this.isPlaying = false;
    sessionStorage.setItem("allbanki-intro-seen", "1");
    const overlay = document.getElementById("introOverlay");
    if (overlay) {
      overlay.classList.add("is-done");
      setTimeout(() => {
        overlay.style.display = "none";
      }, 850);
    }
    if (this.onDone) this.onDone();
  }
}

// 📈 SOTA Code-Video Rate Engine
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
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
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
  // 1. Запуск SK-06 Кинозаставки перед сайтом
  const introCanvas = document.getElementById("introCanvas");
  const introSkipBtn = document.getElementById("introSkipBtn");
  const replayIntroBtn = document.getElementById("replayIntroBtn");

  if (introCanvas) {
    const introEngine = new BankIntroEngine(introCanvas, () => {
      console.log("[SK-06] Заставка завершена, сайт открыт.");
    });

    introEngine.start();

    if (introSkipBtn) {
      introSkipBtn.addEventListener("click", () => introEngine.skip());
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") introEngine.skip();
    });

    if (replayIntroBtn) {
      replayIntroBtn.addEventListener("click", () => {
        sessionStorage.removeItem("allbanki-intro-seen");
        const overlay = document.getElementById("introOverlay");
        if (overlay) {
          overlay.style.display = "flex";
          overlay.classList.remove("is-done");
          const reEngine = new BankIntroEngine(introCanvas, () => {});
          reEngine.start();
        }
      });
    }
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

  // 5. Запуск Code-Video Rate Engine
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
