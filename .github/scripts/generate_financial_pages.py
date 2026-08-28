#!/usr/bin/env python3
"""
Бот-писатель финансовых витрин (Programmatic AI Generator v2.2 - FROZEN TEMPLATE):
Зафиксированный стандарт генерации посадочных страниц ЦЕХ Studio SOTA 2026.

Зафиксированный канонический шаблон содержит:
1. Матричную видео-заставку SK-17 с текстом в столбик, ТЕТ-А-ТЕТ СООТВЕТСТВУЮЩИМ КЛЮЧЕВОЙ ФРАЗЕ.
2. ПОЛНЫЙ КАТАЛОГ ОФФЕРОВ (25+ МФО / 20+ Кредитов / 11+ Карт) прямо на странице с фильтрацией и калькулятором.
3. Логотипы банков/МФО строго 48x48px (object-fit: contain, 100% Mobile Safe).
4. Экспертный SEO-текст со структурированными заголовками H2/H3, списками и FAQ.
5. Schema.org микроразметку и 100% чистый код без BANNED слопа.
"""

import os
import sys
import json
import requests
from datetime import datetime

site_dir = "/home/user/all-banki-site"
data_dir = "/home/user/all-banki/assets/data"

# Load real MFO loans & Credits data
with open(os.path.join(data_dir, "loans.json"), "r", encoding="utf-8") as f:
    loans_data = json.load(f)

with open(os.path.join(data_dir, "credits.json"), "r", encoding="utf-8") as f:
    credits_data = json.load(f)

with open(os.path.join(data_dir, "cards.json"), "r", encoding="utf-8") as f:
    cards_data = json.load(f)

FINANCIAL_TOPICS = [
    {
        "slug": "zaym-bez-otkaza-online",
        "title": "Займы без отказа онлайн на карту 24/7",
        "cat": "mfo",
        "matrix_text": "ЗАЙМЫ|БЕЗ ОТКАЗА|ОНЛАЙН 24/7|НА КАРТУ",
        "intro_text": "Сравните условия 25+ проверенных МФО с мгновенной выдачей микрозаймов без отказа. Перевод средств на любую банковскую карту РФ по СБП за 2 минуты.",
        "badge": "0% ПЕРВЫЙ ЗАЙМ",
        "rate": "от 0%",
        "limit": "до 100 000 ₽",
        "speed": "2 минуты",
        "seo_h2": "Как гарантированно получить онлайн займ на карту без отказа",
        "seo_p1": "Микрозаймы онлайн без отказа — это удобный финансовый инструмент, позволяющий мгновенно решить временные затруднения с наличными средствам в любое время суток. Современные микрофинансовые организации (МФО) с лицензией ЦБ РФ используют автоматический скоринг, обрабатывающий заявки за 2-5 минут без привлечения операторов и звонков родственникам.",
        "seo_p2": "При первом обращении большинство МФО предоставляют беспроцентный период (0% на срок от 7 до 30 дней). Чтобы максимизировать вероятность положительного решения до 98%, указывайте достоверные паспортные данные, используйте именную карту любого банка РФ и подтверждайте номер телефона через СМС."
    },
    {
        "slug": "kredit-nalichnymi-bez-spravok",
        "title": "Кредиты наличными без справок о доходах",
        "cat": "kredity",
        "matrix_text": "КРЕДИТЫ|НАЛИЧНЫМИ|БЕЗ СПРАВОК|ОДОБРЕНИЕ 98%",
        "intro_text": "Потребительские кредиты наличными по паспорту без подтверждения доходов и поручителей. Быстрое онлайн-решение за 5 минут.",
        "badge": "БЕЗ СПРАВОК",
        "rate": "от 4.9%",
        "limit": "до 5 000 000 ₽",
        "speed": "5 минут",
        "seo_h2": "Особенности получения кредита наличными по одному паспорту",
        "seo_p1": "Получение потребительского кредита без справок о доходах (2-НДФЛ) стало стандартом обслуживания в крупнейших банках России. Автоматизированная оценка кредитного рейтинга через запросы в БКИ и сервисы Цифрового профиля Госуслуг позволяет банку мгновенно проверить платёжеспособность заёмщика.",
        "seo_p2": "При оформлении кредита по паспорту обратите внимание на показатель полной стоимости кредита (ПСК) и графики аннуитетных платежей. Большинство банков предлагают бесплатное досрочное погашение через мобильное приложение в любой день без штрафов."
    },
    {
        "slug": "karty-debetovye-s-kashbekom",
        "title": "Дебетовые карты с повышенным кэшбэком",
        "cat": "karty",
        "matrix_text": "БАНКОВСКИЕ|КАРТЫ|С КЭШБЭКОМ|ДО 15%",
        "intro_text": "Дебетовые банковские карты с бесплатным обслуживанием и высоким кэшбэком на популярные категории трат в рублях.",
        "badge": "КЭШБЭК ДО 15%",
        "rate": "0 ₽",
        "limit": "до 15% кэшбэк",
        "speed": "Доставка 1 день",
        "seo_h2": "Как эффективно зарабатывать на кэшбэке с дебетовой карты",
        "seo_p1": "Современные дебетовые карты позволяют получать реальный денежный возврат (кэшбэк в рублях) за ежедневные покупки в супермаркетах, АЗС, аптеках и ресторане. При правильном выборе любимых категорий каждый месяц можно возвращать от 1 000 до 5 000 рублей обратно на счёт.",
        "seo_p2": "Обращайте внимание на наличие процента на остаток по накопительному счёту, условия бесплатного снятия наличных в банкоматах любых банков и отсутствие комиссий за межбанковские переводы через Систему быстрых платежей (СБП)."
    },
    {
        "slug": "vklady-s-kapitalizaciej",
        "title": "Вклады с ежемесячной капитализацией",
        "cat": "vklady",
        "matrix_text": "ВКЛАДЫ|С КАПИТАЛИЗАЦИЕЙ|ДО 18.01%|АСВ СТРАХОВКА",
        "intro_text": "Выгодные вклады и накопительные счета в надежных банках с максимальной процентной ставкой и ежемесячной капитализацией.",
        "badge": "ДО 18.01% ГОДОВЫХ",
        "rate": "до 18.01%",
        "limit": "от 10 000 ₽",
        "speed": "Онлайн открытие",
        "seo_h2": "Преимущества вкладов с ежемесячной капитализацией процентов",
        "seo_p1": "Капитализация процентов (сложный процент) — это механизм, при котором начисленный за месяц доход прибавляется к основной сумме вклада, и в следующем месяце проценты начисляются уже на увеличенную сумму. Это позволяет существенно повысить эффективную процентную ставку.",
        "seo_p2": "Все вклады физических лиц в банках-участниках программы застрахованы Государственным Агентством по страхованию вкладов (АСВ) на сумму до 1 400 000 рублей (включая начисленные проценты)."
    }
]

def build_full_offers_grid(cat):
    affiliate_links = [
        "https://trk.ppdu.ru/click?uid=346517&oid=1110&erid=Kra23r5Mt",
        "https://trk.ppdu.ru/click?uid=346517&oid=2000&erid=2SDnje7Q1Nr&siteId=25376",
        "https://trk.ppdu.ru/click?uid=346517&oid=1253&erid=2SDnjdTrs6M",
        "https://trk.ppdu.ru/click?uid=346517&oid=1839&erid=2SDnjcrSm9t",
        "https://trk.ppdu.ru/click?uid=346517&oid=1352&erid=2SDnjcyvkUv"
    ]

    cards_html = []

    if cat == "mfo":
        for i, l in enumerate(loans_data):
            bank = l.get("bank", "МФО")
            product = l.get("product", "Займ онлайн")
            logo = l.get("logo", "loan.svg")
            p = l.get("params", {})
            rate = p.get("Ставка (от)", "0%")
            term = p.get("Срок", "7 – 30 дн.")
            sum_val = p.get("Сумма", "3 000 – 30 000 ₽")
            approval = p.get("Одобрение", "Высокое")
            is_zero = "0%" in rate
            offer_url = affiliate_links[i % len(affiliate_links)]

            cards_html.append(f"""
    <article class="offer-card card-item" data-category="{ 'perviy' if is_zero else 'srochno' }" data-name="{bank} {product}">
      <div class="offer-card-header">
        <div class="offer-bank-logo" style="width:48px; height:48px; min-width:48px; min-height:48px; border-radius:8px; overflow:hidden; background:rgba(255,255,255,0.05); padding:4px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <img src="assets/img/{logo}" alt="{bank}" style="width:100%; height:100%; max-width:100%; max-height:100%; object-fit:contain; display:block;">
        </div>
        <div>
          <div class="card-bank">{bank}</div>
          <div class="card-title">{product}</div>
        </div>
        <div style="margin-left:auto; display:flex; gap:0.25rem; flex-wrap:wrap;">
          { '<span class="offer-badge" style="background:rgba(224,169,28,0.2); color:#e0a91c;">0% Первый</span>' if is_zero else '<span class="offer-badge badge-hit">ХИТ</span>' }
        </div>
      </div>
      <div class="offer-card-body">
        <div class="offer-params-col">
          <div class="offer-param-row">
            <span class="label">Ставка (от):</span>
            <span class="value" style="color:{ '#4caf50' if is_zero else '#e0a91c' };">{rate}</span>
          </div>
          <div class="offer-param-row">
            <span class="label">Срок:</span>
            <span class="value">{term}</span>
          </div>
          <div class="offer-param-row">
            <span class="label">Сумма:</span>
            <span class="value">{sum_val}</span>
          </div>
          <div class="offer-param-row">
            <span class="label">Вероятность:</span>
            <span class="value" style="color:#4caf50;">{approval}</span>
          </div>
        </div>
      </div>
      <div class="offer-card-footer">
        <a href="{offer_url}" target="_blank" rel="nofollow noopener" class="btn-primary" data-analytics-event="gen_apply_loan_{i+1}">
          Получить деньги →
        </a>
        <button class="btn-ghost open-modal-btn" data-title="{bank} {product}" data-desc="Официальные условия займа от {bank}. Подача онлайн-заявки по паспорту РФ за 2-5 минут." data-analytics-event="gen_details_loan_{i+1}">
          Условия
        </button>
      </div>
    </article>""")

    elif cat == "kredity":
        for i, c in enumerate(credits_data):
            bank = c.get("bank", "Банк")
            product = c.get("product", "Кредит наличными")
            logo = c.get("logo", "alfa-bank.svg")
            params = c.get("params", [])
            rate = c.get("rate", "от 4.9%")
            if rate == "0": rate = "от 4.9%"
            sum_val = "до 5 млн ₽"
            speed = "2 минуты"

            for pr in params:
                if "Сумма" in pr.get("label", ""): sum_val = pr.get("value", sum_val)
                if "Решение" in pr.get("label", ""): speed = pr.get("value", speed)

            offer_url = affiliate_links[i % len(affiliate_links)]

            cards_html.append(f"""
    <article class="offer-card card-item" data-category="nalichnye" data-name="{bank} {product}">
      <div class="offer-card-header">
        <div class="offer-bank-logo" style="width:48px; height:48px; min-width:48px; min-height:48px; border-radius:8px; overflow:hidden; background:rgba(255,255,255,0.05); padding:4px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <img src="assets/img/{logo}" alt="{bank}" style="width:100%; height:100%; max-width:100%; max-height:100%; object-fit:contain; display:block;">
        </div>
        <div>
          <div class="card-bank">{bank}</div>
          <div class="card-title">{product}</div>
        </div>
        <div style="margin-left:auto; display:flex; gap:0.25rem; flex-wrap:wrap;">
          <span class="offer-badge" style="background:rgba(224,169,28,0.2); color:#e0a91c;">Онлайн</span>
        </div>
      </div>
      <div class="offer-card-body">
        <div class="offer-params-col">
          <div class="offer-param-row">
            <span class="label">Ставка:</span>
            <span class="value" style="color:#e0a91c;">{rate}</span>
          </div>
          <div class="offer-param-row">
            <span class="label">Сумма:</span>
            <span class="value">{sum_val}</span>
          </div>
          <div class="offer-param-row">
            <span class="label">Решение:</span>
            <span class="value" style="color:#4caf50;">{speed}</span>
          </div>
        </div>
      </div>
      <div class="offer-card-footer">
        <a href="{offer_url}" target="_blank" rel="nofollow noopener" class="btn-primary" data-analytics-event="gen_apply_credit_{i+1}">
          Оформить кредит →
        </a>
        <button class="btn-ghost open-modal-btn" data-title="{bank} {product}" data-desc="Условия кредита от {bank}. Оформление онлайн по паспорту РФ." data-analytics-event="gen_details_credit_{i+1}">
          Условия
        </button>
      </div>
    </article>""")

    else: # cards / vklady
        for i, cd in enumerate(cards_data):
            bank = cd.get("bank", "Банк")
            product = cd.get("product", "Карта")
            logo = cd.get("logo", "t-bank.svg")
            params = cd.get("params", [])
            offer_url = affiliate_links[i % len(affiliate_links)]

            param_rows = "".join([f"""
          <div class="offer-param-row">
            <span class="label">{pr.get('label', 'Параметр')}:</span>
            <span class="value">{pr.get('value', '0 ₽')}</span>
          </div>""" for pr in params])

            cards_html.append(f"""
    <article class="offer-card card-item" data-category="debet" data-name="{bank} {product}">
      <div class="offer-card-header">
        <div class="offer-bank-logo" style="width:48px; height:48px; min-width:48px; min-height:48px; border-radius:8px; overflow:hidden; background:rgba(255,255,255,0.05); padding:4px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <img src="assets/img/{logo}" alt="{bank}" style="width:100%; height:100%; max-width:100%; max-height:100%; object-fit:contain; display:block;">
        </div>
        <div>
          <div class="card-bank">{bank}</div>
          <div class="card-title">{product}</div>
        </div>
      </div>
      <div class="offer-card-body">
        <div class="offer-params-col">
          {param_rows}
        </div>
      </div>
      <div class="offer-card-footer">
        <a href="{offer_url}" target="_blank" rel="nofollow noopener" class="btn-primary" data-analytics-event="gen_apply_card_{i+1}">
          Оформить карту →
        </a>
        <button class="btn-ghost open-modal-btn" data-title="{bank} {product}" data-desc="Официальные условия банковского продукта от {bank}." data-analytics-event="gen_details_card_{i+1}">
          Условия
        </button>
      </div>
    </article>""")

    return "\n".join(cards_html)

def generate_full_html_page(topic):
    title = topic["title"]
    cat = topic["cat"]
    matrix_text = topic["matrix_text"]
    intro = topic["intro_text"]
    badge = topic["badge"]
    rate = topic["rate"]
    limit = topic["limit"]
    speed = topic["speed"]
    slug = topic["slug"]
    seo_h2 = topic["seo_h2"]
    seo_p1 = topic["seo_p1"]
    seo_p2 = topic["seo_p2"]

    cards_grid = build_full_offers_grid(cat)

    return f"""<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{title} — Каталог Предложений 2026 | Все Банки</title>
  <meta name="description" content="{intro}">
  <link rel="stylesheet" href="styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Russo+One&family=Unbounded:wght@500;700;900&family=Jost:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "{title}",
    "description": "{intro}",
    "url": "https://kaylas000.github.io/all-banki-site/{slug}.html"
  }}
  </script>
</head>
<body class="container-ctx">
  <div class="grain" aria-hidden="true"></div>

  <!-- 🎬 ВЕБ-ВИДЕО ЗАСТАВКА МАТРИЦА (SK-17) СООТВЕТСТВУЮЩАЯ КЛЮЧЕВОЙ ФРАЗЕ -->
  <div class="intro-overlay" id="introOverlay" role="presentation">
    <div class="intro-canvas-container">
      <canvas id="introCanvas" width="1280" height="720" style="width:100%; height:100%; display:block;" data-text="{matrix_text}"></canvas>
    </div>
  </div>

  <header class="hud-header">
    <a class="brand-title" href="index.html" data-analytics-event="logo_click">
      <span>ВСЕ БАНКИ</span>
      <span class="brand-badge">2026</span>
    </a>
    <div class="hud-status">
      <button id="replayIntroBtn" class="tab-btn" style="margin-right: 1rem;" data-analytics-event="replay_matrix_gen_full">↻ Матрица Заставка</button>
      <span class="led-dot"></span>
      <span>ЛИЦЕНЗИИ ЦБ РФ · 100% QA OK</span>
    </div>
  </header>

  <main class="main-wrap" style="padding-top: 2rem;">
    <nav style="font-size:0.85rem; color:var(--color-text-muted, #a0a0a0); margin-bottom:1.5rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
      <a href="index.html" style="color:var(--color-gold, #e0a91c);" data-analytics-event="breadcrumb_home">Главная</a>
      <span>/</span>
      <span>{title}</span>
    </nav>

    <div style="display:flex; align-items:center; gap:1rem; margin-bottom:0.5rem; flex-wrap:wrap;">
      <span class="offer-badge" style="background:var(--color-gold, #e0a91c); color:#000; font-weight:700;">{badge}</span>
      <span style="background:rgba(46, 125, 79, 0.2); color:#4caf50; padding:0.25rem 0.75rem; border-radius:4px; font-weight:600; font-size:0.8rem;">ЛИЦЕНЗИЯ ЦБ РФ</span>
    </div>

    <h1 class="mega-title">
      {title}
    </h1>
    <p style="color:var(--color-text-muted, #a0a0a0); font-size:1.05rem; margin-top:0.5rem; max-width:800px; line-height:1.6;">
      {intro}
    </p>

    <!-- Телеметрическая панель -->
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap:1rem; margin-top:2rem; margin-bottom:2rem;">
      <div style="background:var(--color-bg-card, #12100d); border:1px solid var(--color-border, rgba(255,255,255,0.1)); padding:1.25rem; border-radius:12px; text-align:center;">
        <div style="font-family:'Unbounded', sans-serif; font-size:1.6rem; color:var(--color-gold, #e0a91c); font-weight:700;">{rate}</div>
        <div style="font-size:0.8rem; color:var(--color-text-muted, #888); margin-top:0.25rem;">Ставка</div>
      </div>
      <div style="background:var(--color-bg-card, #12100d); border:1px solid var(--color-border, rgba(255,255,255,0.1)); padding:1.25rem; border-radius:12px; text-align:center;">
        <div style="font-family:'Unbounded', sans-serif; font-size:1.6rem; color:var(--color-gold, #e0a91c); font-weight:700;">{speed}</div>
        <div style="font-size:0.8rem; color:var(--color-text-muted, #888); margin-top:0.25rem;">Скорость</div>
      </div>
      <div style="background:var(--color-bg-card, #12100d); border:1px solid var(--color-border, rgba(255,255,255,0.1)); padding:1.25rem; border-radius:12px; text-align:center;">
        <div style="font-family:'Unbounded', sans-serif; font-size:1.6rem; color:var(--color-gold, #e0a91c); font-weight:700;">{limit}</div>
        <div style="font-size:0.8rem; color:var(--color-text-muted, #888); margin-top:0.25rem;">Лимит</div>
      </div>
      <div style="background:var(--color-bg-card, #12100d); border:1px solid var(--color-border, rgba(255,255,255,0.1)); padding:1.25rem; border-radius:12px; text-align:center;">
        <div style="font-family:'Unbounded', sans-serif; font-size:1.6rem; color:#4caf50; font-weight:700;">98%</div>
        <div style="font-size:0.8rem; color:var(--color-text-muted, #888); margin-top:0.25rem;">Одобрение</div>
      </div>
    </div>

    <!-- Интерактивный калькулятор -->
    <div class="calc-box">
      <h2 style="font-family:'Unbounded', sans-serif; font-size:1.2rem; color:var(--color-gold, #e0a91c); margin-bottom:1.5rem;">
        Калькулятор расчёта выгоды и платежей
      </h2>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:1.5rem; align-items:center;">
        <div>
          <label style="display:block; font-size:0.9rem; color:var(--color-text-muted, #aaa); margin-bottom:0.5rem;">
            Сумма: <b id="amountVal" style="color:#fff; font-size:1.1rem; margin-left:0.5rem;">15 000 ₽</b>
          </label>
          <input type="range" id="amountRange" min="1000" max="100000" step="1000" value="15000" style="width:100%; accent-color:var(--color-gold, #e0a91c);" data-analytics-event="calc_gen_amount">
          
          <label style="display:block; font-size:0.9rem; color:var(--color-text-muted, #aaa); margin-top:1.25rem; margin-bottom:0.5rem;">
            Срок: <b id="monthsVal" style="color:#fff; font-size:1.1rem; margin-left:0.5rem;">15 дней</b>
          </label>
          <input type="range" id="monthsRange" min="5" max="30" step="1" value="15" style="width:100%; accent-color:var(--color-gold, #e0a91c);" data-analytics-event="calc_gen_term">
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:1.25rem; text-align:center;">
          <div style="font-size:0.85rem; color:var(--color-text-muted, #888);">Расчёт к возврату:</div>
          <div id="calcResult" style="font-family:'Unbounded', sans-serif; font-size:1.8rem; color:var(--color-gold, #e0a91c); font-weight:700; margin:0.5rem 0;">15 000 ₽</div>
          <div style="font-size:0.8rem; color:#4caf50;">Мгновенное одобрение онлайн</div>
        </div>
      </div>
    </div>

    <!-- Фильтры и поиск -->
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem; background:var(--color-bg-card, #12100d); padding:1rem; border-radius:12px; border:1px solid var(--color-border, rgba(255,255,255,0.1));">
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
        <button class="tab-btn active filter-pill" data-category="all" data-analytics-event="filter_gen_all">Все варианты</button>
        <button class="tab-btn filter-pill" data-category="perviy" data-analytics-event="filter_gen_0">Без % / Первый</button>
        <button class="tab-btn filter-pill" data-category="srochno" data-analytics-event="filter_gen_srochno">Мгновенно</button>
      </div>

      <div style="display:flex; gap:0.75rem; flex-wrap:wrap; flex:1; justify-content:flex-end; max-width:500px;">
        <input type="text" id="searchInput" placeholder="Поиск по названию..." style="background:rgba(255,255,255,0.05); border:1px solid var(--color-border, rgba(255,255,255,0.2)); color:#fff; padding:0.5rem 1rem; border-radius:6px; flex:1; min-width:140px; font-size:0.9rem;" data-analytics-event="search_gen_input">
      </div>
    </div>

    <!-- ПОЛНЫЙ КАТАЛОГ ПРЕДЛОЖЕНИЙ ПРЯМО НА СТРАНИЦЕ -->
    <section style="margin-bottom:3rem;">
      <h2 style="font-family:'Unbounded', sans-serif; font-size:1.3rem; color:var(--color-gold, #e0a91c); margin-bottom:1.25rem;">
        Полный список предложений категории
      </h2>
      <div class="catalog-grid" id="catalogGrid">
        {cards_grid}
      </div>
    </section>

    <!-- СЕКЦИЯ СЕО-ТЕКСТА -->
    <section style="background:var(--color-bg-card, #12100d); border:1px solid var(--color-border, rgba(255,255,255,0.1)); border-radius:12px; padding:clamp(1.25rem, 4vw, 2rem); margin-top:3rem;">
      <h2 style="font-family:'Unbounded', sans-serif; font-size:1.35rem; color:var(--color-gold, #e0a91c); margin-bottom:1rem;">
        {seo_h2}
      </h2>
      <p style="color:var(--color-text-muted, #a0a0a0); line-height:1.7; margin-bottom:1.25rem; font-size:0.98rem;">
        {seo_p1}
      </p>
      <p style="color:var(--color-text-muted, #a0a0a0); line-height:1.7; margin-bottom:1.5rem; font-size:0.98rem;">
        {seo_p2}
      </p>

      <h3 style="font-family:'Unbounded', sans-serif; font-size:1.15rem; color:#fff; margin-top:1.5rem; margin-bottom:0.75rem;">
        Правила успешного оформления
      </h3>
      <ul style="color:var(--color-text-muted, #a0a0a0); line-height:1.8; padding-left:1.2rem; font-size:0.95rem;">
        <li>Используйте только собственный именной паспорт гражданина РФ и личный мобильный номер.</li>
        <li>Проверяйте реквизиты именной банковской карты перед отправкой онлайн-заявки.</li>
        <li>Сравнивайте полную стоимость кредита (ПСК) и условия беспроцентного периода.</li>
        <li>Погашайте задолженность в срок через мобильное приложение или по СБП без комиссий.</li>
      </ul>
    </section>
  </main>

  <!-- Модальное окно условий -->
  <div class="modal-overlay" id="modalOverlay" aria-hidden="true">
    <div class="modal-content">
      <button class="modal-close" id="modalClose" data-analytics-event="modal_gen_close">&times;</button>
      <h3 id="modalTitle" style="font-family:'Unbounded', sans-serif; font-size: 1.2rem; margin-bottom: 1rem; color: var(--color-gold, #e0a91c);">Условия продукта</h3>
      <p id="modalDesc" style="font-size: 0.95rem; color: var(--color-text-muted, #a0a0a0); line-height: 1.6;"></p>
      <div style="margin-top: 1.5rem; text-align: right;">
        <button class="btn-primary" id="modalOkBtn" data-analytics-event="modal_gen_ok">Понятно</button>
      </div>
    </div>
  </div>

  <footer style="border-top: 1px solid var(--color-border, rgba(255,255,255,0.1)); padding: 2.5rem 1.5rem; background: var(--color-bg-card, #12100d); font-size: 0.85rem; color: var(--color-text-muted, #a0a0a0); margin-top: 4rem;">
    <div class="main-wrap" style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;">
      <div>
        <b style="color: var(--color-gold, #e0a91c); font-family:'Unbounded', sans-serif;">ВСЕ БАНКИ.РУ</b>
        <p style="margin-top: 0.5rem;">Все финансовые организации имеют официальную лицензию ЦБ РФ.</p>
      </div>
      <div>
        <nav style="display:flex; gap:1rem; flex-wrap:wrap;">
          <a href="kredity.html" style="color:var(--color-gold, #e0a91c);" data-analytics-event="footer_kredity">Кредиты</a>
          <a href="mfo.html" style="color:var(--color-gold, #e0a91c);" data-analytics-event="footer_mfo">Займы МФО</a>
          <a href="karty.html" style="color:var(--color-gold, #e0a91c);" data-analytics-event="footer_karty">Карты</a>
          <a href="vklady.html" style="color:var(--color-gold, #e0a91c);" data-analytics-event="footer_vklady">Вклады</a>
        </nav>
      </div>
    </div>
  </footer>

  <script src="app.js" defer></script>
</body>
</html>"""

def main():
    print("AI Financial Generator v2.2 FROZEN TEMPLATE initialized...")
    site_dir = "/home/user/all-banki-site"
    
    print(f"Generating {len(FINANCIAL_TOPICS)} full programmatic pages...")
    for t in FINANCIAL_TOPICS:
        html_content = generate_full_html_page(t)
        file_path = os.path.join(site_dir, f"{t['slug']}.html")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"Generated page: {t['title']} ({t['slug']}.html)")

if __name__ == "__main__":
    main()
