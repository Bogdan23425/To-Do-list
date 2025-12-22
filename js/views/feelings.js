import { getTodayKey, formatLongDate } from "../date.js";
import { ensureDay, saveFeelings } from "../store.js";
import { MoodGrid } from "../components/moodGrid.js";
import { escapeHtml } from "../utils.js";

export function renderFeelings({ navigate, rerender }) {
  const todayKey = getTodayKey();
  const day = ensureDay(todayKey);
  const html = `
    <section class="page">
      <div class="page-header">
        <div>
          <div class="page-title">Как я себя чувствую сегодня?</div>
          <div class="page-subtitle">${escapeHtml(formatLongDate(todayKey))}</div>
        </div>
        <a class="button secondary" href="#/today">Назад к задачам</a>
      </div>

      <div class="card">
        <div class="page-title">Настроение дня</div>
        <p class="page-subtitle">Любой ответ подходит.</p>
        <div style="margin-top:16px;">
          ${MoodGrid(day.mood)}
        </div>
        <div class="notes" style="margin-top:24px;">
          <label>
            <div class="badge badge-icon">
              <span class="icon icon-pen" aria-hidden="true"></span>
              Что повлияло на это?
            </div>
            <textarea class="input note-input" id="note-reason" rows="3" placeholder="Необязательно"></textarea>
          </label>
          <label>
            <div class="badge badge-icon">
              <span class="icon icon-pen" aria-hidden="true"></span>
              Что я желаю себе завтра?
            </div>
            <textarea class="input note-input" id="note-wish" rows="3" placeholder="Необязательно"></textarea>
          </label>
        </div>
        <div class="task-actions" style="margin-top:20px;">
          <button class="button" id="save-day" type="button">Сохранить день</button>
        </div>
        <div class="notice" id="mood-warning" style="margin-top:16px; display:none;">Выбери настроение, чтобы сохранить день.</div>
      </div>
    </section>
  `;

  function onMount() {
    const reasonInput = document.getElementById("note-reason");
    const wishInput = document.getElementById("note-wish");
    const saveButton = document.getElementById("save-day");
    const warning = document.getElementById("mood-warning");

    if (reasonInput) reasonInput.value = day.notes?.reason || "";
    if (wishInput) wishInput.value = day.notes?.wish || "";

    document.querySelectorAll(".mood-option").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".mood-option").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        button.setAttribute("data-selected", "true");
      });
    });

    saveButton?.addEventListener("click", () => {
      const selected = document.querySelector(".mood-option.active");
      const mood = selected?.getAttribute("data-mood") || "";
      if (!mood) {
        warning.style.display = "block";
        return;
      }
      warning.style.display = "none";
      saveFeelings(todayKey, mood, {
        reason: reasonInput?.value || "",
        wish: wishInput?.value || "",
      });
      rerender();
      navigate("#/summary");
    });
  }

  return { html, onMount, title: "MyTodo дневник — Настроение" };
}
