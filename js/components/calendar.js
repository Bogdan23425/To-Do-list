import { buildCalendar, getTodayKey, getWeekdays } from "../date.js";
import { MOOD_COLORS } from "./moodGrid.js";

export function Calendar(monthKey, daysMap) {
  const weekdays = getWeekdays();
  const cells = buildCalendar(monthKey);
  const todayKey = getTodayKey();

  const moodIconClass = (mood) => {
    if (mood === "Счастлив") return "icon-mood-happy";
    if (mood === "Грустное") return "icon-mood-sad";
    return "icon-mood-neutral";
  };

  const header = weekdays
    .map((day) => `<div class="calendar-header">${day}</div>`)
    .join("");

  const body = cells
    .map((cell) => {
      if (!cell.inMonth) {
        return `<div class="calendar-day empty"></div>`;
      }
      const entry = daysMap[cell.dateKey];
      const mood = entry?.savedAt ? entry.mood : "";
      const dot = mood
        ? `<span class="mood-dot icon ${moodIconClass(mood)}" style="background-color:${MOOD_COLORS[mood] || "#c0b0a0"}"></span>`
        : "";
      const isToday = cell.dateKey === todayKey;
      return `
        <button class="calendar-day ${isToday ? "active" : ""}" data-date="${cell.dateKey}" type="button">
          <div>${cell.dateKey.split("-")[2]}</div>
          ${dot}
        </button>
      `;
    })
    .join("");

  return `<div class="calendar">${header}${body}</div>`;
}
