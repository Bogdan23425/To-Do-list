import { getTodayKey, formatLongDate, shiftDate } from "../date.js";
import { escapeHtml } from "../utils.js";

export function renderHome({ state }) {
  const todayKey = getTodayKey();
  const today = state.days[todayKey];
  const tasks = today?.tasks || [];
  const completedCount = tasks.filter((task) => task.completed).length;
  const mood = today?.mood || "";
  const moodIconClass = () => {
    if (mood === "Счастлив") return "icon-mood-happy";
    if (mood === "Грустное") return "icon-mood-sad";
    return "icon-mood-neutral";
  };
  const streakCount = (() => {
    const savedKeys = new Set(
      Object.values(state.days || {})
        .filter((day) => day?.savedAt)
        .map((day) => day.date)
    );
    let current = savedKeys.has(todayKey) ? todayKey : shiftDate(todayKey, -1);
    let count = 0;
    while (savedKeys.has(current)) {
      count += 1;
      current = shiftDate(current, -1);
    }
    return count;
  })();

  const html = `
    <section class="page">
      <div class="home-layout">
        <div class="home-card card">
          <div class="home-left">
            <div class="page-title">Тихий дневник задач</div>
            <div class="page-subtitle">Дней подряд: ${streakCount}</div>
            <p class="page-subtitle">${escapeHtml(formatLongDate(todayKey))}</p>
            <div class="summary-grid summary-list">
              <div class="card-soft">
                <strong>${tasks.length}</strong> Задач на сегодня
              </div>
              <div class="card-soft">
                <strong>${completedCount}</strong> Выполнено
              </div>
              <div class="card-soft mood-inline">
                <span class="icon ${moodIconClass()}" aria-hidden="true"></span>
                <span>Настроение</span>
              </div>
            </div>
            <div class="task-actions" style="margin-top:16px;">
              <a class="button" href="#/today">Открыть сегодняшний день</a>
              <a class="button secondary" href="#/history">История</a>
            </div>
          </div>
        </div>
        <div class="home-illustration">
          <img src="assets/pixel/diary-cover.png" alt="Обложка дневника" />
        </div>
      </div>
    </section>
  `;

  return { html, title: "MyTodo дневник — Главная" };
}
