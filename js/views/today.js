import { getTodayKey, formatLongDate, formatWeekday, formatMonthName } from "../date.js";
import { addTask, deleteTask, ensureDay, toggleTask } from "../store.js";
import { escapeHtml } from "../utils.js";
import { TaskItem } from "../components/taskItem.js";

function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    if (a.time && b.time) return a.time.localeCompare(b.time);
    if (a.time) return -1;
    if (b.time) return 1;
    return 0;
  });
}

export function renderToday({ state, navigate, rerender }) {
  const todayKey = getTodayKey();
  const day = ensureDay(todayKey);
  const tasks = sortTasks(day.tasks || []);
  const completedCount = tasks.filter((task) => task.completed).length;
  const progressValue = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  const html = `
    <section class="page">
      <div class="today-grid">
        <div class="today-meta">
          <div class="card day-card">
            <div class="day-weekday">${escapeHtml(formatWeekday(todayKey))}</div>
            <div class="day-date-circle">${todayKey.split("-")[2]}</div>
            <div class="day-month">${escapeHtml(formatMonthName(todayKey))}</div>
          </div>

          <div class="card progress-card">
            <div class="progress-label">Прогресс</div>
            <div class="progress-track">
              <div class="progress-bar" style="width:${progressValue}%"></div>
            </div>
            <div class="progress-meta">${completedCount} из ${tasks.length} задач</div>
            <div class="task-actions" style="margin-top:12px;">
              <a class="button secondary" href="#/home">На главную</a>
            </div>
          </div>
        </div>

        <div class="card task-card">
          <div class="task-card-header">
            <div class="page-title">Задачи на сегодня</div>
            <p class="page-subtitle">Добавь то, что действительно по силам.</p>
          </div>
          <div class="task-actions inline-add" style="margin-top:16px;">
            <input class="input" id="task-input" placeholder="Напиши задачу..." />
            <button class="button" id="add-task" type="button">Добавить</button>
          </div>
          <div class="card-soft task-list-card" style="margin-top:16px;">
            <div class="task-list">
              ${tasks.length ? tasks.map((task) => TaskItem(task, { readOnly: false })).join("") : `
                <div class="lined-note">
                  <span class="empty-state">
                    <span class="icon icon-sparkle" aria-hidden="true"></span>
                    Пока пусто. Можно добавить одну маленькую задачу.
                  </span>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>

      <div class="finish-day">
        <button class="button" id="finish-day" type="button">Завершить день</button>
        ${tasks.length === 0 ? `<div class="notice" style="margin-top:16px;">Без задач тоже можно завершить день.</div>` : ""}
      </div>
    </section>
  `;

  function onMount() {
    const input = document.getElementById("task-input");
    const addButton = document.getElementById("add-task");
    const finishButton = document.getElementById("finish-day");

    addButton?.addEventListener("click", () => {
      addTask(todayKey, input.value);
      input.value = "";
      rerender();
    });

    input?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        addTask(todayKey, input.value);
        input.value = "";
        rerender();
      }
    });

    document.querySelectorAll(".task-item[data-task-id]").forEach((item) => {
      const taskId = item.getAttribute("data-task-id");
      const deleteButton = item.querySelector("[data-action='delete']");

      item.addEventListener("click", (event) => {
        const target = event.target;
        if (target.closest("button") || target.matches("input")) return;
        toggleTask(todayKey, taskId);
        rerender();
      });

      deleteButton?.addEventListener("click", () => {
        deleteTask(todayKey, taskId);
        rerender();
      });
    });

    finishButton?.addEventListener("click", () => {
      navigate("#/feelings");
    });
  }

  return { html, onMount, title: "MyTodo дневник — Сегодня" };
}
