import fs from "node:fs";
import path from "node:path";

/* Microservice 1: Low-Frequency Phrase Generator */
export function generateLowFrequencyPhrases(count = 5) {
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
      keyword: "потребительский кредит 500 тысяч без справки 2 ндфл",
      category: "kredity",
      slug: "kredit-500-tysyach-bez-2-ndfl",
      matrixLines: ["КРЕДИТ 500 ТЫС", "БЕЗ 2-НДФЛ", "ПО ПАСПОРТУ", "СТАВКА 4.9%"],
      targetSum: "500 000 ₽",
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
      keyword: "вклад с высоким процентом и ежемесячной капитализацией на 6 месяцев",
      category: "vklady",
      slug: "vklad-высокий-procent-kapitalizaciya-6-mesyacev",
      matrixLines: ["ВКЛАД 18.01%", "С КАПИТАЛИЗАЦИЕЙ", "НА 6 МЕСЯЦЕВ", "АСВ СТРАХОВКА"],
      targetSum: "50 000 ₽",
      targetRate: "18.01%"
    }
  ];

  return seedKeywords.slice(0, count);
}

if (process.argv[1].endsWith("phrase-service.mjs")) {
  const phrases = generateLowFrequencyPhrases(5);
  console.log("Microservice 1 [Phrase Generator] output:");
  console.log(JSON.stringify(phrases, null, 2));
}
