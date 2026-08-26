/* ------------------------------------------------------------------ */
/* Все Банки — SOTA 2026 Interactive Portal Engine                    */
/* ------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Табы фильтрации продуктов
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

  // 2. Интерактивный калькулятор
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

  // 3. Модальное окно условий
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

  // 4. SOTA Code-Video Wave Rate Indicator Canvas
  const canvas = document.getElementById("rateCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let frame = 0;

    function renderWave() {
      if (!ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Чертёжная сетка
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Волна изменения ставок
      ctx.beginPath();
      ctx.strokeStyle = "#e0a91c"; // Gold Accent
      ctx.lineWidth = 3;

      for (let x = 0; x < w; x += 5) {
        const y = h / 2 + Math.sin((x + frame * 3) * 0.02) * 20 + Math.cos((x - frame) * 0.01) * 8;
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

  // 5. MultiLanding URL parameter handling
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
