/* ------------------------------------------------------------------ */
/* Все Банки — CineLine Scroll-Driven Code-Video Engine (SK-03 / SK-16) */
/* ------------------------------------------------------------------ */

class BankCineLineEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.progress = 0;
    this.frame = 0;

    this.acts = [
      {
        tag: "АКТ I · АНАЛИЗ И СЕКВЕНЦИЯ",
        title: "Сборка базы предложений 20+ банков",
        desc: "Автоматический фильтр комиссии, проверка лицензий ЦБ РФ и расчет ПСК."
      },
      {
        tag: "АКТ II · КАЛЬКУЛЯЦИЯ ВЫГОДЫ",
        title: "Аннуитетный расчет ставок и кэшбэка",
        desc: "Перерасчет процента на остаток и льготного периода за 1 миллисекунду."
      },
      {
        tag: "АКТ III · МГНОВЕННОЕ ОДОБРЕНИЕ",
        title: "Фиксация условий и подача онлайн-заявки",
        desc: "Защищенный передаточный канал с решением за 2 минуты без визита в банк."
      }
    ];

    this.init();
  }

  init() {
    this.particles = Array.from({ length: 400 }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      tx: Math.random() * this.canvas.width,
      ty: Math.random() * this.canvas.height,
      size: 1.2 + Math.random() * 2.5,
      color: Math.random() < 0.25 ? "rgba(224, 169, 28, 0.85)" : "rgba(232, 230, 222, 0.4)"
    }));
  }

  setScrub(p) {
    this.progress = Math.min(1, Math.max(0, p));
    this.frame = Math.round(this.progress * 204); // 204 кадров SOTA
    this.render();
  }

  render() {
    const ctx = this.ctx;
    if (!ctx) return;

    const w = this.canvas.width;
    const h = this.canvas.height;
    const p = this.progress;

    // Trail motion blur
    ctx.fillStyle = "rgba(15, 14, 10, 0.35)";
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = "rgba(224, 169, 28, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 44) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }

    // Interactive Conveyor Line
    const lineY = h * 0.7;
    ctx.strokeStyle = "rgba(232, 230, 222, 0.25)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, lineY);
    ctx.lineTo(w, lineY);
    ctx.stroke();

    // Moving Workpiece Box
    const boxX = p * (w - 140);
    ctx.fillStyle = "oklch(0.18 0.03 260)";
    ctx.strokeStyle = "#e0a91c";
    ctx.lineWidth = 2;
    ctx.fillRect(boxX, lineY - 40, 140, 40);
    ctx.strokeRect(boxX, lineY - 40, 140, 40);

    ctx.fillStyle = "#e0a91c";
    ctx.font = "700 11px 'JetBrains Mono', monospace";
    ctx.fillText(`CINE-FRAME #${String(this.frame).padStart(3, "0")}`, boxX + 12, lineY - 18);

    // Particles Motion Assembly
    this.particles.forEach((pt, i) => {
      const curX = pt.x + (pt.tx - pt.x) * p + Math.sin(p * Math.PI * 6 + i) * 12;
      const curY = pt.y + (pt.ty - pt.y) * p + Math.cos(p * Math.PI * 6 + i) * 12;

      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(curX, curY, pt.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Telemetry Text
    ctx.font = "700 10px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(232, 230, 222, 0.5)";
    ctx.fillText(`CINE-LINE SCRUBBING · PROGRESS: ${(p * 100).toFixed(1)}%`, 16, h - 16);

    // Update Overlay Info text based on Scrub Act
    const actIdx = Math.min(2, Math.floor(p * 3));
    const currentAct = this.acts[actIdx];

    const tagEl = document.querySelector("#cineInfo .cineline-tag");
    const titleEl = document.querySelector("#cineInfo .cineline-title");
    const descEl = document.querySelector("#cineInfo .cineline-desc");

    if (tagEl) tagEl.textContent = currentAct.tag;
    if (titleEl) titleEl.textContent = currentAct.title;
    if (descEl) descEl.textContent = currentAct.desc;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. CineLine Scrubbing Engine
  const cineCanvas = document.getElementById("cineCanvas");
  const cineScrubber = document.getElementById("cineScrubber");

  if (cineCanvas && cineScrubber) {
    const cineEngine = new BankCineLineEngine(cineCanvas);
    cineEngine.setScrub(0);

    cineScrubber.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value) / 100;
      cineEngine.setScrub(val);
    });

    // Автопрокрутка скроллом при входе во вьюпорт
    window.addEventListener("scroll", () => {
      const rect = cineCanvas.getBoundingClientRect();
      const winH = window.innerHeight;

      if (rect.top < winH && rect.bottom > 0) {
        const p = Math.min(1, Math.max(0, (winH - rect.top) / (winH + rect.height)));
        cineEngine.setScrub(p);
        cineScrubber.value = Math.round(p * 100);
      }
    }, { passive: true });
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

  // 5. MultiLanding
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
