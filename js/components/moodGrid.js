import { escapeHtml } from "../utils.js";

export const MOODS = [
  "Счастлив",
  "Обычное",
  "Грустное",
];

export const MOOD_COLORS = {
  "Счастлив": "#e7b663",
  "Обычное": "#9bb17a",
  "Грустное": "#5b6a4f",
};

export function MoodGrid(selectedMood = "", { disabled = false } = {}) {
  const moodIcon = (mood) => {
    if (mood === "Счастлив") return "icon-mood-happy";
    if (mood === "Грустное") return "icon-mood-sad";
    return "icon-mood-neutral";
  };

  return `
    <div class="mood-grid ${disabled ? "disabled" : ""}">
      ${MOODS.map(
        (mood) => `
          <button class="mood-option mood-only ${selectedMood === mood ? "active" : ""}" data-mood="${escapeHtml(mood)}" type="button" ${disabled ? "disabled" : ""}>
            <span class="icon ${moodIcon(mood)}" aria-hidden="true"></span>
            <span class="mood-text">${escapeHtml(mood)}</span>
          </button>
        `
      ).join("")}
    </div>
  `;
}
