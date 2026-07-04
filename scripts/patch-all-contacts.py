#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Один скрипт, который обновляет ВСЕ контакты во всех файлах проекта.
Запуск: python3 /home/z/my-project/scripts/patch-all-contacts.py
"""

import re
from pathlib import Path

ROOT = Path("/home/z/my-project/src")

# Правильные контакты
PHONE_DISPLAY = "+7 (965) 050-31-25"
PHONE_HREF = "+79650503125"
EMAIL = "Oldgoodbatman@gmail.com"
TG_HANDLE = "@rancisvokami"
TG_HREF = "https://t.me/rancisvokami"
VK_HANDLE = "vk.com/romano"
VK_HREF = "https://vk.com/romano"

# Простые пары (old_literal, new_literal) — без regex, без заморочек
REPLACEMENTS = [
    # Телефоны
    ("+7 (495) 120-77-99", PHONE_DISPLAY),
    ("+74951207799", PHONE_HREF),
    # Email
    ("hello@babushkarobot.ru", EMAIL),
    ("privacy@babushkarobot.ru", EMAIL),
    ("legal@babushkarobot.ru", EMAIL),
    # Telegram — ВАЖНО: сначала длинные строки, потом короткие
    ("https://t.me/babushka_robot", TG_HREF),
    ("t.me/babushka_robot", "t.me/rancisvokami"),
    ("@babushka_robot", TG_HANDLE),
    # VK
    ("https://vk.com/babushkarobot", VK_HREF),
    ("vk.com/babushkarobot", VK_HANDLE),
    # Старый адрес офиса не трогаем — он нормальный
]

def patch_file(path: Path):
    if not path.exists():
        return 0
    content = path.read_text(encoding="utf-8")
    original = content
    count = 0

    for old, new in REPLACEMENTS:
        if old in content:
            n = content.count(old)
            content = content.replace(old, new)
            count += n

    if content != original:
        path.write_text(content, encoding="utf-8")
        print(f"  ✓ {path.relative_to(ROOT.parent)}: {count} замен")
    return count

print("Патчинг контактов во всех файлах...")
total = 0

for ext in ["*.ts", "*.tsx"]:
    for path in ROOT.rglob(ext):
        if "node_modules" in str(path):
            continue
        total += patch_file(path)

print(f"\nИтого: {total} замен")

# Проверка остатков
print("\n=== Проверка остатков ===")
leftovers = 0
for path in ROOT.rglob("*.ts*"):
    if "node_modules" in str(path):
        continue
    content = path.read_text(encoding="utf-8")
    for old, _ in REPLACEMENTS:
        if old in content:
            print(f"  ⚠ {path.relative_to(ROOT.parent)}: найдено '{old}'")
            leftovers += 1
if leftovers == 0:
    print("  ✓ Старых контактов не найдено")
print("\nГотово!")
