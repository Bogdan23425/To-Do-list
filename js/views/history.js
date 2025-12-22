import { Calendar } from "../components/calendar.js";
import { formatMonthLabel, getMonthKey, shiftMonth } from "../date.js";
import { getAllDays } from "../store.js";

export function renderHistory({ params, navigate }) {
  const monthKey = params.get("month") || getMonthKey();
  const days = getAllDays();
  const hasEntries = Object.values(days).some(
    (day) => day?.savedAt && day?.date?.startsWith(monthKey)
  );

  const html = `
    <section class="page">
      <div class="page-header">
        <div>
          <div class="page-title">История</div>
          <div class="page-subtitle">Возвращайся к прошлым дням бережно.</div>
        </div>
        <a class="button secondary" href="#/home">На главную</a>
      </div>

      <div class="card">
        <div class="page-header">
          <div>
            <div class="page-title">${formatMonthLabel(monthKey)}</div>
            <div class="page-subtitle">Нажми на день, чтобы прочитать.</div>
          </div>
          <div class="calendar-toolbar">
            <button class="button secondary" id="prev-month" type="button">Назад</button>
            <button class="button secondary" id="next-month" type="button">Вперёд</button>
          </div>
        </div>
        ${Calendar(monthKey, days)}
        ${!hasEntries ? `<div class="notice" style="margin-top:16px;">Нет записей. Начни с сегодняшнего дня.</div>` : ""}
      </div>
    </section>
  `;

  function onMount() {
    const prevButton = document.getElementById("prev-month");
    const nextButton = document.getElementById("next-month");

    prevButton?.addEventListener("click", () => {
      navigate(`#/history?month=${shiftMonth(monthKey, -1)}`);
    });

    nextButton?.addEventListener("click", () => {
      navigate(`#/history?month=${shiftMonth(monthKey, 1)}`);
    });

    document.querySelectorAll(".calendar-day[data-date]").forEach((dayButton) => {
      dayButton.addEventListener("click", () => {
        const dateKey = dayButton.getAttribute("data-date");
        if (dateKey) {
          navigate(`#/day?date=${dateKey}`);
        }
      });
    });
  }

  return { html, onMount, title: "MyTodo дневник — История" };
}
