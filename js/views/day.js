import { formatLongDate, getMonthKey } from "../date.js";
import { getDay } from "../store.js";
import { escapeHtml } from "../utils.js";
import { TaskItem } from "../components/taskItem.js";

export function renderDayDetails({ params }) {
  const dateKey = params.get("date");
  const day = dateKey ? getDay(dateKey) : null;
  const monthKey = dateKey ? getMonthKey(dateKey) : getMonthKey();

  const html = `
    <section class="page">
      <div class="page-header">
        <div>
          <div class="page-title">Детали дня</div>
          <div class="page-subtitle">${dateKey ? escapeHtml(formatLongDate(dateKey)) : ""}</div>
        </div>
        <a class="button secondary" href="#/history?month=${monthKey}">Назад к истории</a>
      </div>

      <div class="card">
        ${!day ? `
          <div class="card-soft lined-note">
            <span class="empty-state">
              <span class="icon icon-sparkle" aria-hidden="true"></span>
              Нет записи за этот день.
            </span>
          </div>
        ` : `
          <div class="details-grid">
            <div>
              <div>Задачи</div>
              <div class="task-list" style="margin-top:12px;">
                ${day.tasks?.length ? day.tasks.map((task) => TaskItem(task, { readOnly: true })).join("") : `
                  <div class="card-soft lined-note">
                    <span class="empty-state">
                      <span class="icon icon-sparkle" aria-hidden="true"></span>
                      Задач не было.
                    </span>
                  </div>
                `}
              </div>
            </div>
            <div>
              <div>Настроение</div>
              <div class="card-soft" style="margin-top:12px;">${escapeHtml(day.mood || "Не сохранено")}</div>
            </div>
            <div>
              <div>Заметки</div>
              <div class="notes" style="margin-top:12px;">
                <div class="card-soft lined-note">${escapeHtml(day.notes?.reason || "Без заметок")}</div>
                <div class="card-soft lined-note">${escapeHtml(day.notes?.wish || "Без пожеланий")}</div>
              </div>
            </div>
          </div>
        `}
      </div>
    </section>
  `;

  return { html, title: "MyTodo дневник — День" };
}
