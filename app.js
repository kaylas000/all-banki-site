/* ------------------------------------------------------------------ */
/* Все Банки — SOTA 2026 Interactive Web Video Showcase Engine (SK-16) */
/* ------------------------------------------------------------------ */

class BankWebVideoShowcaseEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.frame = 0;
    this.totalFrames = 240; // 4 секунды при 60 FPS
    this.fps = 60;
    this.isPlaying = true;
    this.soundEnabled = false;
    this.ac = null;

    this.scenes = [
      {
        startFrame: 0,
        endFrame: 60,
        badge: "СЦЕНА 1 ИЗ 4 · АНАЛИЗ БАЗЫ БАНКОВ",
        title: "Мониторинг предложений 20+ банков ЦБ РФ"
      },
      {
        startFrame: 60,
        endFrame: 120,
        badge: "СЦЕНА 2 ИЗ 4 · КАРТЫ И КРЕДИТЫ",
        title: "Лучшие кредитные карты с кэшбэком до 15%"
      },
      {
        startFrame: 120,
        endFrame: 180,
        badge: "СЦЕНА 3 ИЗ 4 · КАЛЬКУЛЯЦИЯ СТАВОК",
        title: "Вклады до 18.01% годовых и 0% займы МФО"
      },
      {
        startFrame: 180,
        endFrame: 240,
        badge: "СЦЕНА 4 ИЗ 4 · ОДОБРЕНИЕ ЗА 2 МИНУТЫ",
        title: "Шанс одобрения 98% по паспорту РФ"
      }
    ];

    this.init();
  }

  init() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.particles = Array.from({ length: 350 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: 1.2 + Math.random() * 2.8,
      color: Math.random() < 0.3 ? "#e0a91c" : "#1d3a5f"
    }));
  }

  setFrame(f) {
    this.frame = Math.min(this.totalFrames - 1, Math.max(0, f));
    this.renderCurrentFrame();
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    return this.isPlaying;
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    if (this.soundEnabled && !this.ac) {
      try {
        const Ctor = window.AudioContext || window.webkitAudioContext;
        this.ac = new Ctor();
      } catch (e) {
        this.ac = null;
      }
    }
    if (this.soundEnabled && this.ac && this.ac.state === "suspended") {
      this.ac.resume().catch(() => undefined);
    }
    return this.soundEnabled;
  }

  playAudioClick() {
    if (!this.soundEnabled || !this.ac) return;
    try {
      const t = this.ac.currentTime;
      const osc = this.ac.createOscillator();
      const gain = this.ac.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(110, t + 0.1);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc.connect(gain);
      gain.connect(this.ac.destination);
      osc.start(t);
      osc.stop(t + 0.1);
    } catch (e) {
      // Audio fallback
    }
  }

  renderCurrentFrame() {
    const ctx = this.ctx;
    if (!ctx) return;

    const w = this.canvas.width;
    const h = this.canvas.height;
    const f = this.frame;
    const progress = f / this.totalFrames;

    // Motion Blur Trail Effect
    ctx.fillStyle = "rgba(15, 14, 10, 0.35)";
    ctx.fillRect(0, 0, w, h);

    // 1. Blueprint Grid Lines
    ctx.strokeStyle = "rgba(224, 169, 28, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 44) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 44) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // 2. Animated Particle Flow
    this.particles.forEach((pt) => {
      pt.x += pt.vx;
      pt.y += pt.vy;
      if (pt.x < 0 || pt.x > w) pt.vx *= -1;
      if (pt.y < 0 || pt.y > h) pt.vy *= -1;

      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. Scene-specific 3D Canvas Graphics
    if (f < 60) {
      // Scene 1: 3D Gold Symbol & Title
      const p1 = f / 60;
      ctx.save();
      ctx.translate(w / 2, h / 2 - 20);
      ctx.scale(0.5 + p1 * 0.5, 0.5 + p1 * 0.5);

      ctx.fillStyle = "#e0a91c";
      ctx.font = "900 64px 'Russo One', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("₽ ВСЕ БАНКИ", 0, 0);
      ctx.restore();
    } else if (f < 120) {
      // Scene 2: Flying Bank Cards in 3D Isometric Projection
      const p2 = (f - 60) / 60;
      const cardWidth = 220;
      const cardHeight = 130;

      // Card 1 (T-Bank)
      ctx.save();
      ctx.translate(w * 0.25, h * 0.4 + Math.sin(p2 * Math.PI * 2) * 10);
      ctx.rotate(-0.08);
      ctx.fillStyle = "#16150f";
      ctx.strokeStyle = "#e0a91c";
      ctx.lineWidth = 2;
      ctx.fillRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight);
      ctx.strokeRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight);
      ctx.fillStyle = "#e0a91c";
      ctx.font = "700 14px 'Unbounded', sans-serif";
      ctx.fillText("Т-БАНК BLACK", -cardWidth / 2 + 16, -cardHeight / 2 + 30);
      ctx.font = "700 20px 'Unbounded', sans-serif";
      ctx.fillText("15% КЭШБЭК", -cardWidth / 2 + 16, cardHeight / 2 - 20);
      ctx.restore();

      // Card 2 (Alfa-Bank)
      ctx.save();
      ctx.translate(w * 0.75, h * 0.4 - Math.sin(p2 * Math.PI * 2) * 10);
      ctx.rotate(0.08);
      ctx.fillStyle = "#16150f";
      ctx.strokeStyle = "#ce2c18";
      ctx.lineWidth = 2;
      ctx.fillRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight);
      ctx.strokeRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight);
      ctx.fillStyle = "#ce2c18";
      ctx.font = "700 14px 'Unbounded', sans-serif";
      ctx.fillText("АЛЬФА-БАНК", -cardWidth / 2 + 16, -cardHeight / 2 + 30);
      ctx.font = "700 20px 'Unbounded', sans-serif";
      ctx.fillText("365 ДНЕЙ %", -cardWidth / 2 + 16, cardHeight / 2 - 20);
      ctx.restore();
    } else if (f < 180) {
      // Scene 3: Rate Wave Curve
      const p3 = (f - 120) / 60;
      ctx.beginPath();
      ctx.strokeStyle = "#e0a91c";
      ctx.lineWidth = 4;
      for (let x = 0; x < w; x += 5) {
        const y = h * 0.5 + Math.sin((x + f * 4) * 0.02) * 40 * (1 - p3 * 0.3);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = "#e0a91c";
      ctx.font = "700 28px 'Unbounded', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("ВКЛАДЫ ДО 18.01% · ЗАЙМЫ 0%", w / 2, h * 0.25);
    } else {
      // Scene 4: Approval Gauge & Call to Action
      const p4 = (f - 180) / 60;
      ctx.fillStyle = "#2e7d4f";
      ctx.font = "900 52px 'Russo One', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("ОДОБРЕНИЕ 98%", w / 2, h / 2 - 10);
      ctx.fillStyle = "#e0a91c";
      ctx.font = "700 16px 'JetBrains Mono', monospace";
      ctx.fillText("ОНЛАЙН ЗАЯВКА ЗА 2 МИНУТЫ БЕЗ ВИЗИТА В БАНК", w / 2, h / 2 + 35);
    }

    // 4. Update HUD Text & Scrubber UI
    const sceneIdx = Math.min(3, Math.floor(f / 60));
    const currentScene = this.scenes[sceneIdx];

    const badgeEl = document.getElementById("sceneBadge");
    const titleEl = document.getElementById("sceneTitle");
    const timerEl = document.getElementById("webVideoTimer");
    const scrubberEl = document.getElementById("webVideoScrubber") as HTMLInputElement | null;

    if (badgeEl) badgeEl.textContent = currentScene.badge;
    if (titleEl) titleEl.textContent = currentScene.title;
    if (timerEl) {
      const sec = (f / 60).toFixed(1);
      timerEl.textContent = `00:0${Math.floor(f / 60)} / 00:04 (${sec}s)`;
    }
    if (scrubberEl && document.activeElement !== scrubberEl) {
      scrubberEl.value = String(f);
    }
  }

  tick() {
    if (!this.isPlaying) return;
    this.frame = (this.frame + 1) % this.totalFrames;
    this.renderCurrentFrame();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Инициализация SOTA Web Video Engine
  const canvas = document.getElementById("webVideoCanvas") as HTMLCanvasElement | null;
  const playBtn = document.getElementById("webVideoPlayBtn");
  const restartBtn = document.getElementById("webVideoRestartBtn");
  const scrubber = document.getElementById("webVideoScrubber") as HTMLInputElement | null;
  const audioBtn = document.getElementById("webVideoAudioBtn");

  if (canvas) {
    const videoEngine = new BankWebVideoShowcaseEngine(canvas);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function loop() {
      videoEngine.tick();
      if (!isReduced) {
        requestAnimationFrame(loop);
      }
    }

    loop();

    if (playBtn) {
      playBtn.addEventListener("click", () => {
        const playing = videoEngine.togglePlay();
        playBtn.textContent = playing ? "⏸ Пауза" : "▶ Воспроизвести";
        videoEngine.playAudioClick();
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        videoEngine.setFrame(0);
        videoEngine.playAudioClick();
      });
    }

    if (scrubber) {
      scrubber.addEventListener("input", (e) => {
        const f = parseInt((e.target as HTMLInputElement).value, 10);
        videoEngine.setFrame(f);
      });
    }

    if (audioBtn) {
      audioBtn.addEventListener("click", () => {
        const soundOn = videoEngine.toggleSound();
        audioBtn.textContent = soundOn ? "🔊 Включен SFX" : "🔇 Выключен SFX";
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
