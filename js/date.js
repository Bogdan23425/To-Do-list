import { toISODate } from "./utils.js";

const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const MONTHS_GENITIVE = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const WEEKDAYS = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const WEEKDAYS_FULL = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

export function getWeekdays() {
  return WEEKDAYS;
}

export function getTodayKey() {
  return toISODate(new Date());
}

export function formatLongDate(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return `${date.getDate()} ${MONTHS_GENITIVE[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatWeekday(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return WEEKDAYS_FULL[date.getDay()];
}

export function formatMonthName(dateKey) {
  const [year, month] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  return MONTHS[date.getMonth()].toLowerCase();
}

export function getMonthKey(dateKey = getTodayKey()) {
  return dateKey.slice(0, 7);
}

export function formatMonthLabel(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

export function shiftMonth(monthKey, delta) {
  const [year, month] = monthKey.split("-").map(Number);
  const date = new Date(year, month - 1 + delta, 1);
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}`;
}

export function shiftDate(dateKey, deltaDays) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day + deltaDays);
  return toISODate(date);
}

export function buildCalendar(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const startWeekday = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const cells = [];
  for (let i = 0; i < startWeekday; i += 1) {
    cells.push({ dateKey: null, inMonth: false });
  }
  for (let day = 1; day <= totalDays; day += 1) {
    const date = new Date(year, month - 1, day);
    cells.push({ dateKey: toISODate(date), inMonth: true });
  }

  const remaining = (7 - (cells.length % 7)) % 7;
  for (let i = 0; i < remaining; i += 1) {
    cells.push({ dateKey: null, inMonth: false });
  }

  return cells;
}
