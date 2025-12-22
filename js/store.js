import { generateId } from "./utils.js";

const STORAGE_KEY = "calmpixel_diary_v1";

const defaultState = {
  days: {},
  ui: {
    lastRoute: "#/home",
  },
};

function normalizeDay(raw = {}) {
  return {
    date: raw.date || "",
    savedAt: raw.savedAt || null,
    tasks: Array.isArray(raw.tasks) ? raw.tasks.map(normalizeTask) : [],
    mood: raw.mood || "",
    notes: {
      reason: raw.notes?.reason || "",
      wish: raw.notes?.wish || "",
    },
  };
}

function normalizeTask(raw = {}) {
  return {
    id: raw.id || generateId(),
    text: raw.text || "",
    time: raw.time || "",
    completed: Boolean(raw.completed),
  };
}

export function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!stored || typeof stored !== "object") {
      return { ...defaultState };
    }
    const days = stored.days && typeof stored.days === "object" ? stored.days : {};
    const normalizedDays = {};
    Object.keys(days).forEach((key) => {
      const day = normalizeDay(days[key]);
      normalizedDays[key] = { ...day, date: key || day.date };
    });
    return {
      days: normalizedDays,
      ui: {
        lastRoute: stored.ui?.lastRoute || defaultState.ui.lastRoute,
      },
    };
  } catch (error) {
    return { ...defaultState };
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function setLastRoute(route) {
  const state = loadState();
  state.ui.lastRoute = route;
  saveState(state);
}

export function getDay(dateKey) {
  const state = loadState();
  return state.days[dateKey] ? normalizeDay(state.days[dateKey]) : null;
}

export function getAllDays() {
  const state = loadState();
  return state.days;
}

export function ensureDay(dateKey) {
  const state = loadState();
  if (!state.days[dateKey]) {
    state.days[dateKey] = {
      date: dateKey,
      savedAt: null,
      tasks: [],
      mood: "",
      notes: { reason: "", wish: "" },
    };
    saveState(state);
  }
  return normalizeDay(state.days[dateKey]);
}

function updateDay(dateKey, updater) {
  const state = loadState();
  const existing = state.days[dateKey] || {
    date: dateKey,
    savedAt: null,
    tasks: [],
    mood: "",
    notes: { reason: "", wish: "" },
  };
  const updated = updater(normalizeDay(existing));
  state.days[dateKey] = updated;
  saveState(state);
  return updated;
}

export function addTask(dateKey, text) {
  if (!text.trim()) return null;
  return updateDay(dateKey, (day) => {
    const newTask = { id: generateId(), text: text.trim(), time: "", completed: false };
    return { ...day, tasks: [...day.tasks, newTask] };
  });
}

export function setTask(dateKey, task) {
  return updateDay(dateKey, (day) => {
    const tasks = day.tasks.map((item) => (item.id === task.id ? { ...item, ...task } : item));
    return { ...day, tasks };
  });
}

export function toggleTask(dateKey, taskId) {
  return updateDay(dateKey, (day) => {
    const tasks = day.tasks.map((item) =>
      item.id === taskId ? { ...item, completed: !item.completed } : item
    );
    return { ...day, tasks };
  });
}

export function deleteTask(dateKey, taskId) {
  return updateDay(dateKey, (day) => {
    const tasks = day.tasks.filter((item) => item.id !== taskId);
    return { ...day, tasks };
  });
}

export function saveFeelings(dateKey, mood, notes) {
  return updateDay(dateKey, (day) => {
    return {
      ...day,
      mood: mood || "",
      notes: {
        reason: notes?.reason || "",
        wish: notes?.wish || "",
      },
      savedAt: Date.now(),
    };
  });
}
