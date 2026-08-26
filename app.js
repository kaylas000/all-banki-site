/* ------------------------------------------------------------------ */
/* Все Банки — SOTA 2026 Interactive Vertical Matrix Web-Video Engine  */
/* ------------------------------------------------------------------ */

// 🎬 ИНТЕРАКТИВНАЯ ВЕРТИКАЛЬНАЯ ЦИФРОВАЯ МАТРИЦА С ТЕКСТОМ В СТОЛБИК
class BankMatrixVideoEngine {
  constructor(canvas, onDone) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.onDone = onDone;
    this.frame = 0;
    this.totalFrames = 240; // 4.0 секунды при 60 FPS
    this.fps = 60;
    this.isPlaying = true;
    this.fontSize = 16;
    this.columns = [];
    this.matrixChars = "0123456789%₽$ABCDEF18.01%365ДНЕЙКЭШБЭК";

    // Сценарий текста в столбик:
    // ВИТРИНА
    // КРЕДИТОВ
    // И
    // ЗАЙМОВ
    this.columnText = ["ВИТРИНА", "КРЕДИТОВ", "И", "ЗАЙМОВ"];

    this.init();
  }

  init() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const colCount = Math.floor(w / this.fontSize);

    this.columns = Array.from({ length: colCount }, () => ({
      y: Math.random() * -h,
      speed: 3 + Math.random() * 6,
      chars: Array.from({ length: 25 }, () => this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)])
    }));
  }

  start() {
    this.loop();
  }

  loop = () => {
    if (!this.isPlaying) return;

    const p = this.frame / this.totalFrames;
    this.renderMatrixFrame(p);

    this.frame++;

    if (this.frame >= this.totalFrames) {
      this.finish();
      return;
    }

    requestAnimationFrame(this.loop);
  };

  renderMatrixFrame(p) {
    const ctx = this.ctx;
    if (!ctx) return;

    const w = this.canvas.width;
    const h = this.canvas.height;
    const f = this.frame;

    // 1. Тёмный фон с легким размытием шлейфа (Matrix Rain Trail)
    ctx.fillStyle = "rgba(12, 11, 8, 0.25)";
    ctx.fillRect(0, 0, w, h);

    // 2. РЕНДЕР ВЕРТИКАЛЬНОЙ ЦИФРОВОЙ МАТРИЦЫ (Matrix Code Rain)
    ctx.font = "700 14px 'JetBrains Mono', monospace";

    this.columns.forEach((col, i) => {
      const x = i * this.fontSize;
      col.y += col.speed;

      if (col.y > h + 100) {
        col.y = -Math.random() * 200;
        col.speed = 3 + Math.random() * 6;
      }

      // Отрисовка цепочки падающих цифр и символов
      col.chars.forEach((char, charIdx) => {
        const charY = col.y - charIdx * (this.fontSize + 2);
        if (charY > 0 && charY < h) {
          if (charIdx === 0) {
            // Головная яркая цифра матрицы
            ctx.fillStyle = "#ffffff";
          } else if (charIdx < 4) {
            // Золотистый градиент матрицы ЦЕХа
            ctx.fillStyle = "rgba(224, 169, 28, 0.9)";
          } else {
            // Изумрудно-зеленый след матрицы
            ctx.fillStyle = "rgba(46, 125, 79, 0.4)";
          }

          // Иногда меняем случайный символ в дожде
          const displayChar = (Math.random() < 0.05) 
            ? this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)] 
            : char;

          ctx.fillText(displayChar, x, charY);
        }
      });
    });

    // 3. РЕНДЕР ТЕКСТА В СТОЛБИК ПО СЦЕНАРИЮ:
    //    ВИТРИНА
    //    КРЕДИТОВ
    //    И
    //    ЗАЙМОВ
    const textProgress = Math.min(1, Math.max(0, (p - 0.1) / 0.8));
    const lineStep = 1 / this.columnText.length;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const startY = h * 0.25;
    const lineHeight = Math.min(64, h * 0.15);

    this.columnText.forEach((word, lineIdx) => {
      const lineProgress = Math.min(1, Math.max(0, (textProgress - lineIdx * lineStep) / lineStep));

      if (lineProgress > 0) {
        const lineY = startY + lineIdx * lineHeight;

        // Эффект скрэмбл-декодирования символов
        const settledCount = Math.floor(lineProgress * word.length * 1.2);
        let displayWord = "";
        for (let c = 0; c < word.length; c++) {
          if (c < settledCount) {
            displayWord += word[c];
          } else {
            displayWord += this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
          }
        }

        ctx.save();
        ctx.translate(w / 2, lineY);

        // Плавное проявление и выравнивание
        ctx.globalAlpha = Math.min(1, lineProgress * 2);

        // Вспышка свечения текста при проявлении
        ctx.shadowColor = "#e0a91c";
        ctx.shadowBlur = 20 * lineProgress;

        ctx.font = "900 clamp(28px, 6vw, 56px) 'Russo One', sans-serif";
        ctx.fillStyle = lineIdx === 2 ? "#ce2c18" : "#e0a91c"; // "И" подсвечено красным, остальные золотом
        ctx.fillText(displayWord, 0, 0);

        ctx.restore();
      }
    });

    // 4. ТИТРЫ КАДРА (SOTA Telemetry)
    ctx.font = "700 11px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(224, 169, 28, 0.9)";
    ctx.textAlign = "left";
    ctx.fillText(`КАДР ${String(Math.min(240, f)).padStart(3, "0")}/240 · 60 FPS · ВЕРТИКАЛЬНАЯ МАТРИЦА`, 24, h - 34);
    ctx.fillText(`ВИТРИНА КРЕДИТОВ И ЗАЙМОВ (SK-06 / SK-16)`, 24, h - 18);
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
  // 1. Запуск Интерактивной Вертикальной Цифровой Матрицы с текстом в столбик
  const introCanvas = document.getElementById("introCanvas");
  const introSkipBtn = document.getElementById("introSkipBtn");
  const replayIntroBtn = document.getElementById("replayIntroBtn");

  if (introCanvas) {
    const introEngine = new BankMatrixVideoEngine(introCanvas, () => {
      console.log("[SK-06 / Matrix Video] Заставка с текстом в столбик завершена, сайт открыт.");
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
          const reEngine = new BankMatrixVideoEngine(introCanvas, () => {});
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
