<h1 align="center">MyTodo дневник</h1>

<p align="center">
  Тёплый пиксель‑дневник задач и настроений с историей по календарю.
</p>

<p align="center">
  <img src="assets/pixel/icon.png" alt="MyTodo Icon" width="72" height="72" />
</p>

<p align="center">
  <img src="assets/pixel/diary-cover.png" alt="Обложка дневника" width="320" />
</p>

---

## О проекте

MyTodo — это уютный дневник на каждый день: небольшие задачи, одно настроение и две короткие заметки. Всё сохраняется локально и работает офлайн.

## Возможности

- ежедневные задачи с быстрым добавлением
- отметка выполнения одним кликом
- выбор настроения (3 состояния)
- короткие заметки о дне
- история в календаре
- офлайн‑режим (PWA)

## Технологии

- Vanilla HTML/CSS/JS
- LocalStorage
- Service Worker + Manifest (PWA)

## Запуск

Открой `index.html` в браузере.

Для установки как приложения (PWA):
- Открой сайт в Chrome
- Нажми кнопку «Установить» в адресной строке

## Структура

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
```

## Хранение данных

LocalStorage key: `calmpixel_diary_v1`

Пример:
```
{
  "days": {
    "2025-12-22": {
      "date": "2025-12-22",
      "savedAt": 1766428800000,
      "tasks": [{ "id": "t1", "text": "Учиться", "time": "", "completed": false }],
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

---

Если хочешь добавить свои иконки или стили — просто замени файлы в `assets/`.
