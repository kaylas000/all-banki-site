/* ------------------------------------------------------------------ */
/* Все Банки — РАДИКАЛЬНЫЙ 4-АКТНЫЙ КИНО-ДВИЖОК ВЕБ-ВИДЕО (SK-06/16)  */
/* ------------------------------------------------------------------ */

class RadicalBankVideoIntroEngine {
  constructor(canvas, onDone) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.onDone = onDone;
    this.frame = 0;
    this.totalFrames = 240; // 4.0 сек при 60 FPS
    this.isPlaying = true;
    this.soundEnabled = false;
    this.ac = null;

    this.acts = [
      { id: "I", tag: "АКТ I · СКАНЕР РЫНКА", title: "Мониторинг 20+ банков ЦБ РФ", sub: "Ставка 18.01% · ПСК 0%" },
      { id: "II", tag: "АКТ II · 3D-КАРТЫ И ВКЛАДЫ", title: "Т-Банк, Альфа, Сбер, еКапуста", sub: "Кэшбэк 15% · 365 дней 0%" },
      { id: "III", tag: "АКТ III · ФИКСАЦИЯ СТАВКИ", title: "ОДОБРЕНИЕ ЗАЯВКИ 98%", sub: "Без справок и визита в банк" },
      { id: "IV", tag: "АКТ IV · ШТОРКИ К САЙТУ", title: "ОТКРЫТИЕ ФИНАНСОВОЙ КОНСОЛИ", sub: "Доступ разрешен 24/7" }
    ];

    this.init();
  }

  init() {
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 3D Графический массив частиц с Z-координатой
    this.particles = Array.from({ length: 1800 }, () => ({
      x: (Math.random() - 0.5) * w * 2.5,
      y: (Math.random() - 0.5) * h * 2.5,
      z: Math.random() * 1000 + 1,
      size: 1.5 + Math.random() * 3.0,
      color: Math.random() < 0.4 ? "#e0a91c" : Math.random() < 0.7 ? "#1d3a5f" : "#e8e6de"
    }));

    // Код символов скрэмбла
    this.scrambleChars = "0123456789%₽ВСЕБАНКИ#/_=";
  }

  start() {
    this.loop();
  }

  loop = () => {
    if (!this.isPlaying) return;

    const p = this.frame / this.totalFrames;
    this.renderRadicalFrame(p);

    this.frame++;

    if (this.frame >= this.totalFrames) {
      this.finish();
      return;
    }

    requestAnimationFrame(this.loop);
  };

  renderRadicalFrame(p) {
    const ctx = this.ctx;
    if (!ctx) return;

    const w = this.canvas.width;
    const h = this.canvas.height;
    const f = this.frame;

    // 1. Темный кинематографический фон с анаморфным зерном
    ctx.fillStyle = "#0c0b08";
    ctx.fillRect(0, 0, w, h);

    // 2. Чертёжная координатная сетка
    ctx.strokeStyle = "rgba(224, 169, 28, 0.06)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 44) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 44) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // 3. РЕНДЕР 4 АКТОВ СЦЕНАРИЯ
    if (f < 60) {
      // ----------------------------------------------------
      // АКТ I: ТЕХНИЧЕСКИЙ ХАОС И СКАНЕР (0.0s - 1.0s)
      // ----------------------------------------------------
      const p1 = f / 60;
      
      // Вращающийся сканирующий луч
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(p1 * Math.PI * 2);
      ctx.strokeStyle = "rgba(224, 169, 28, 0.35)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 140, 0, Math.PI * 1.5);
      ctx.stroke();
      ctx.restore();

      // Бегающие строки валют и ставок
      ctx.font = "700 12px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(232, 230, 222, 0.6)";
      ctx.textAlign = "center";
      ctx.fillText(`ЦБ РФ: 18.01% · Т-БАНК: 15% · АЛЬФА: 365 ДНЕЙ · СБЕР: 5 МЛН ₽`, w / 2, h * 0.35);
      ctx.fillText(`СКАНЕР ИНДЕКСАЦИИ СТАВОК... ${Math.round(p1 * 100)}%`, w / 2, h * 0.65);

    } else if (f < 130) {
      // ----------------------------------------------------
      // АКТ II: ПОЛЁТ 3D-КАРТ И ЗОЛОТЫХ МОНЕТ (1.0s - 2.1s)
      // ----------------------------------------------------
      const p2 = (f - 60) / 70;
      const cardW = 240;
      const cardH = 140;

      // 3D Карта 1: Т-Банк Black (смещение слева)
      ctx.save();
      ctx.translate(w * 0.3 - (1 - p2) * 200, h * 0.45 + Math.sin(p2 * Math.PI * 3) * 12);
      ctx.rotate(-0.1 + Math.sin(p2 * Math.PI) * 0.05);
      ctx.fillStyle = "#16150f";
      ctx.strokeStyle = "#e0a91c";
      ctx.lineWidth = 3;
      ctx.fillRect(-cardW / 2, -cardH / 2, cardW, cardH);
      ctx.strokeRect(-cardW / 2, -cardH / 2, cardW, cardH);

      ctx.fillStyle = "#e0a91c";
      ctx.font = "900 15px 'Unbounded', sans-serif";
      ctx.fillText("Т-БАНК BLACK", -cardW / 2 + 16, -cardH / 2 + 32);
      ctx.font = "700 22px 'Unbounded', sans-serif";
      ctx.fillText("15% КЭШБЭК", -cardW / 2 + 16, cardH / 2 - 20);
      ctx.restore();

      // 3D Карта 2: Альфа-Банк 365 (смещение справа)
      ctx.save();
      ctx.translate(w * 0.7 + (1 - p2) * 200, h * 0.45 - Math.cos(p2 * Math.PI * 3) * 12);
      ctx.rotate(0.1 - Math.sin(p2 * Math.PI) * 0.05);
      ctx.fillStyle = "#16150f";
      ctx.strokeStyle = "#ce2c18";
      ctx.lineWidth = 3;
      ctx.fillRect(-cardW / 2, -cardH / 2, cardW, cardH);
      ctx.strokeRect(-cardW / 2, -cardH / 2, cardW, cardH);

      ctx.fillStyle = "#ce2c18";
      ctx.font = "900 15px 'Unbounded', sans-serif";
      ctx.fillText("АЛЬФА-БАНК 365", -cardW / 2 + 16, -cardH / 2 + 32);
      ctx.font = "700 22px 'Unbounded', sans-serif";
      ctx.fillText("365 ДНЕЙ 0%", -cardW / 2 + 16, cardH / 2 - 20);
      ctx.restore();

    } else if (f < 190) {
      // ----------------------------------------------------
      // АКТ III: УДАР ШТАМПА И ГОЛД-ФЛЭШ (2.1s - 3.1s)
      // ----------------------------------------------------
      const p3 = (f - 130) / 60;
      const easeImpact = (p3 >= 1) ? 1 : 1 - Math.pow(2, -10 * p3);

      // Анаморфная золотая вспышка по центру
      const flareG = ctx.createLinearGradient(0, h / 2, w, h / 2);
      flareG.addColorStop(0, "rgba(224,169,28,0)");
      flareG.addColorStop(0.5, `rgba(224,169,28,${0.75 * (1 - p3)})`);
      flareG.addColorStop(1, "rgba(224,169,28,0)");
      ctx.fillStyle = flareG;
      ctx.fillRect(0, h / 2 - 4, w, 8);

      // Грандиозный заголовок
      ctx.save();
      ctx.translate(w / 2, h / 2 - 20);
      ctx.scale(1.8 - 0.8 * easeImpact, 1.8 - 0.8 * easeImpact);

      ctx.font = "900 76px 'Russo One', sans-serif";
      ctx.fillStyle = "#e0a91c";
      ctx.textAlign = "center";
      ctx.fillText("ВСЕ БАНКИ", 0, 0);
      ctx.restore();

      // Штамп одобрения
      if (p3 > 0.4) {
        ctx.font = "900 20px 'Unbounded', sans-serif";
        ctx.fillStyle = "#2e7d4f";
        ctx.textAlign = "center";
        ctx.fillText("✓ ОДОБРЕНИЕ ЗАЯВКИ 98% · ОНЛАЙН 2 МИН", w / 2, h / 2 + 55);
      }

    } else {
      // ----------------------------------------------------
      // АКТ IV: РАЗДВИЖЕНИЕ ШТОР И ВЫХОД (3.1s - 4.0s)
      // ----------------------------------------------------
      ctx.font = "900 76px 'Russo One', sans-serif";
      ctx.fillStyle = "#e0a91c";
      ctx.textAlign = "center";
      ctx.fillText("ВСЕ БАНКИ", w / 2, h / 2 - 20);

      ctx.font = "700 16px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#e8e6de";
      ctx.fillText("ОТКРЫТИЕ ФИНАНСОВОЙ КОНСОЛИ...", w / 2, h / 2 + 55);
    }

    // 4. ТИТРЫ И ТЕЛЕМЕТРИЯ КАДРА
    const actIdx = Math.min(3, Math.floor(f / 60));
    const curAct = this.acts[actIdx];

    ctx.font = "700 11px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(224, 169, 28, 0.9)";
    ctx.textAlign = "left";
    ctx.fillText(`КАДР ${String(f).padStart(3, "0")}/240 · 60 FPS · ${curAct.tag}`, 24, h - 36);
    ctx.fillStyle = "rgba(232, 230, 222, 0.6)";
    ctx.fillText(`${curAct.title} · ${curAct.sub}`, 24, h - 20);
  }

  skip() {
    this.finish();
  }

  finish() {
    this.isPlaying = false;
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
  // 1. Запуск Радикального 4-актного Кино-видео интро
  const introCanvas = document.getElementById("introCanvas");
  const introSkipBtn = document.getElementById("introSkipBtn");
  const replayIntroBtn = document.getElementById("replayIntroBtn");

  if (introCanvas) {
    const introEngine = new RadicalBankVideoIntroEngine(introCanvas, () => {
      console.log("[SK-06 / Radical Video] Радикальная заставка завершена, сайт открыт.");
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
        const overlay = document.getElementById("introOverlay");
        if (overlay) {
          overlay.style.display = "flex";
          overlay.classList.remove("is-done");
          const reEngine = new RadicalBankVideoIntroEngine(introCanvas, () => {});
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
