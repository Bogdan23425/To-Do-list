<h1 align="center">MyTodo дневник</h1>

<p align="center">
  Тёплый пиксель‑дневник задач и настроений с историей по календарю.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML-5-E34F26?logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS-3-1572B6?logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=000" alt="JavaScript ES6" />
</p>

---

## О проекте

**MyTodo дневник** — это уютный дневник на каждый день: небольшие задачи, одно настроение и две короткие заметки. Всё сохраняется локально и работает офлайн.

## Возможности

- ежедневные задачи с быстрым добавлением  
- отметка выполнения одним кликом  
- выбор настроения (3 состояния)  
- заметки о дне  
- история в календаре  
- офлайн‑режим (PWA)

## Запуск

Открой `index.html` в браузере.

Чтобы установить как приложение (PWA):
- Открой сайт в Chrome  
- Нажми «Установить» в адресной строке

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
