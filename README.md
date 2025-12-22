<h1 align="center">MyTodo — Pixel Task Diary</h1>

<p align="center">
  Минималистичный пиксельный дневник задач и настроений.  
  Pet-project с офлайн-режимом, историей по календарю и локальным хранением данных.
</p>

<p align="center">
  <a href="https://bogdan23425.github.io/To-Do-list/" target="_blank">
    <img src="https://img.shields.io/badge/LIVE%20DEMO-OPEN-2ea44f?style=for-the-badge" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML-5-E34F26?logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS-3-1572B6?logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=000" />
  <img src="https://img.shields.io/badge/PWA-Offline-5A67D8" />
</p>

## О проекте

**MyTodo** — это спокойный и простой дневник для повседневного использования.  
Проект создан как pet-project с фокусом на минимализм, офлайн-доступ и чистую архитектуру без сборщиков.

Каждый день пользователь может:
- записать несколько задач
- отметить их выполнение
- выбрать настроение дня
- оставить две короткие заметки
- просмотреть историю по календарю

Все данные сохраняются локально и доступны без интернета.

## Демо

Сайт доступен по адресу:  
**https://bogdan23425.github.io/To-Do-list/**

## Возможности

- ежедневные задачи с быстрым добавлением
- выполнение задач одним кликом
- выбор настроения (3 состояния)
- короткие заметки о дне
- история заполненных дней в календаре
- офлайн-режим (PWA)
- хранение данных в LocalStorage

## Установка и запуск

### Локально

1. Склонируй репозиторий:
```bash
git clone https://github.com/Bogdan23425/To-Do-list.git
```
2. Открой `index.html` в браузере.

Проект не использует сборщики и сторонние зависимости.

### PWA

Приложение можно установить как PWA.

**Desktop (Chrome):**
- открой сайт
- нажми «Install» в адресной строке

**Mobile (Android):**
- открой сайт
- меню браузера → «Установить приложение»

## Структура проекта

```
index.html
manifest.json
sw.js

styles/
  tokens.css
  base.css
  components.css
  pages.css

js/
  app.js
  router.js
  store.js
  date.js
  utils.js
  views/
  components/

assets/
  icons/
  pixel/
  fonts/
  screenshots/
```

## Хранение данных

Данные сохраняются в LocalStorage.

Ключ:
```
calmpixel_diary_v1
```

Пример структуры:
```json
{
  "days": {
    "2025-12-22": {
      "date": "2025-12-22",
      "savedAt": 1766428800000,
      "tasks": [
        {
          "id": "t1",
          "text": "Учиться",
          "time": "",
          "completed": false
        }
      ],
      "mood": "Счастлив",
      "notes": {
        "reason": "Спокойный день.",
        "wish": "Лечь пораньше."
      }
    }
  },
  "ui": {
    "lastRoute": "#/home"
  }
}
```

## Планы на развитие

- экспорт и импорт данных
- статистика по задачам и настроению
- поиск по истории
- дополнительные темы оформления

## Лицензия

MIT
