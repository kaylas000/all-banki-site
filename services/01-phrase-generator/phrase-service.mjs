import fs from "node:fs";

/* Microservice 1: Low-Frequency Long-Tail Phrase Generator */

export function generateLowFrequencyPhrases(count = 10) {
  const seedKeywords = [
    {
      keyword: "займ 5000 рублей на карту без проверок и звонков",
      category: "mfo",
      slug: "zaym-5000-na-kartu-bez-zvonkov",
      matrixLines: ["ЗАЙМ 5000 ₽", "НА КАРТУ МИР", "БЕЗ ЗВОНКОВ", "ОДОБРЕНИЕ 98%"],
      targetSum: "5 000 ₽",
      targetRate: "0%"
    },
    {
      keyword: "срочный микрозайм круглосуточно по паспорту с 18 лет",
      category: "mfo",
      slug: "srochnyj-zaym-kruglesutochno-18-let",
      matrixLines: ["СРОЧНЫЙ ЗАЙМ", "КРУГЛОСУТОЧНО", "ПО ПАСПОРТУ", "С 18 ЛЕТ"],
      targetSum: "15 000 ₽",
      targetRate: "0%"
    },
    {
      keyword: "микрозайм на карту по сбп мгновенно без отказа ночью",
      category: "mfo",
      slug: "mikrozaym-na-kartu-sbp-mgnovenno-nochyu",
      matrixLines: ["ЗАЙМ ПО СБП", "МГНОВЕННО", "БЕЗ ОТКАЗА", "НОЧЬЮ 24/7"],
      targetSum: "30 000 ₽",
      targetRate: "0%"
    },
    {
      keyword: "займ без работы и с плохой кредитной историей мгновенно",
      category: "mfo",
      slug: "zaym-bez-raboty-s-plohoj-ki-mgnovenno",
      matrixLines: ["ЗАЙМ БЕЗ РАБОТЫ", "С ПЛОХОЙ КИ", "МГНОВЕННО", "БЕЗ СПРАВОК"],
      targetSum: "10 000 ₽",
      targetRate: "0%"
    },
    {
      keyword: "потребительский кредит 500 тысяч без справки 2 ндфл",
      category: "kredity",
      slug: "kredit-500-tysyach-bez-2-ndfl",
      matrixLines: ["КРЕДИТ 500 ТЫС", "БЕЗ 2-НДФЛ", "ПО ПАСПОРТУ", "СТАВКА 4.9%"],
      targetSum: "500 000 ₽",
      targetRate: "от 4.9%"
    },
    {
      keyword: "кредит наличными по паспорту с мгновенным онлайн решением",
      category: "kredity",
      slug: "kredit-nalichnymi-po-pasportu-mgnovenno",
      matrixLines: ["КРЕДИТ НАЛИЧНЫМИ", "ПО ПАСПОРТУ", "РЕШЕНИЕ 2 МИН", "ДО 5 МЛН ₽"],
      targetSum: "1 000 000 ₽",
      targetRate: "от 4.9%"
    },
    {
      keyword: "дебетовая карта с высоким процентом на остаток и бесплатным обслуживанием",
      category: "karty",
      slug: "debetovaya-karta-procent-na-ostatok-besplatno",
      matrixLines: ["БАНКОВСКИЕ КАРТЫ", "% НА ОСТАТОК", "КЭШБЭК ДО 15%", "0 ₽/МЕСЯЦ"],
      targetSum: "0 ₽",
      targetRate: "до 15%"
    },
    {
      keyword: "кредитная карта с льготным периодом 365 дней без процентов",
      category: "karty",
      slug: "kreditnaya-karta-365-dnej-bez-procentov",
      matrixLines: ["КРЕДИТНАЯ КАРТА", "365 ДНЕЙ БЕЗ %", "ЛИМИТ 500 ТЫС", "ДОСТАВКА 0 ₽"],
      targetSum: "500 000 ₽",
      targetRate: "0% 365 дней"
    },
    {
      keyword: "вклад с высоким процентом и ежемесячной капитализацией на 6 месяцев",
      category: "vklady",
      slug: "vklad-высокий-procent-kapitalizaciya-6-mesyacev",
      matrixLines: ["ВКЛАД 18.01%", "С КАПИТАЛИЗАЦИЕЙ", "НА 6 МЕСЯЦЕВ", "АСВ СТРАХОВКА"],
      targetSum: "50 000 ₽",
      targetRate: "18.01%"
    },
    {
      keyword: "накопительный счет с ежедневным начислением процентов без ограничений",
      category: "vklady",
      slug: "nakopitelnyj-schet-ezhednevno-bez-ogranichenij",
      matrixLines: ["НАКОПИТЕЛЬНЫЙ", "ЕЖЕДНЕВНЫЙ %", "БЕЗ СНЯТИЯ %", "СТАВКА 17%"],
      targetSum: "100 000 ₽",
      targetRate: "до 17%"
    }
  ];

  return seedKeywords.slice(0, count);
}

if (process.argv[1].endsWith("phrase-service.mjs")) {
  const phrases = generateLowFrequencyPhrases(10);
  console.log("Microservice 1 [Phrase Generator] output count:", phrases.length);
}
