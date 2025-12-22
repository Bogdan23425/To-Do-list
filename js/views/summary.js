import { getTodayKey, formatLongDate } from "../date.js";
import { getDay } from "../store.js";
import { escapeHtml } from "../utils.js";

export function renderSummary() {
  const todayKey = getTodayKey();
  const day = getDay(todayKey);

  const html = `
    <section class="page">
      <div class="card">
        <div class="page-title">День сохранён.</div>
        <p class="page-subtitle">${escapeHtml(formatLongDate(todayKey))}</p>
        <div class="summary-grid" style="margin-top:20px;">
          <div class="card-soft">
            <strong>${day?.tasks?.length || 0}</strong> задач записано
          </div>
          <div class="card-soft">
            <strong>${day?.mood || "Настроение"}</strong> зафиксировано
          </div>
          <div class="card-soft">
            <strong>${day?.notes?.wish ? "Пожелание записано" : "Без пожеланий"}</strong>
          </div>
        </div>
        <p class="page-subtitle" style="margin-top:16px;">Увидимся завтра.</p>
        <div class="task-actions" style="margin-top:24px;">
          <a class="button" href="#/home">На главную</a>
          <a class="button secondary" href="#/history">История</a>
        </div>
      </div>
    </section>
  `;

  return { html, title: "MyTodo дневник — Итог" };
}
