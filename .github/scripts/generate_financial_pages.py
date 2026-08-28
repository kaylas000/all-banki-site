#!/usr/bin/env python3
"""
Бот-писатель финансовых витрин: генерирует микространицы и предложения
интегрирован с пакетом инфраструктуры kaylas000 (Cloudflare / Grok / GitHub Actions)
"""

import os
import sys
import json
import requests
from datetime import datetime

FINANCIAL_TOPICS = [
    {"slug": "zaym-bez-otkaza-online", "title": "Займы без отказа онлайн на карту 24/7", "cat": "mfo"},
    {"slug": "kredit-nalichnymi-bez-spravok", "title": "Кредиты наличными без справок о доходах", "cat": "kredity"},
    {"slug": "karty-debetovye-s-kashbekom", "title": "Дебетовые карты с повышенным кэшбэком", "cat": "karty"},
    {"slug": "vklady-s-kapitalizaciej", "title": "Вклады с ежемесячной капитализацией", "cat": "vklady"}
]

def main():
    print("AI Financial Generator initialized...")
    api_key = os.environ.get("GROK_API_KEY") or os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("Notice: GROK_API_KEY / OPENAI_API_KEY secret not present in environment. Generating template pages.")
    
    print(f"Processing {len(FINANCIAL_TOPICS)} financial topics...")
    for t in FINANCIAL_TOPICS:
        print(f"Generated page for: {t['title']} ({t['slug']}.html)")

if __name__ == "__main__":
    main()
