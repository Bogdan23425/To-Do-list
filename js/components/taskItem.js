import { escapeHtml } from "../utils.js";

export function TaskItem(task, { readOnly = false } = {}) {
  if (readOnly) {
    return `
      <div class="task-item ${task.completed ? "complete" : ""}">
        <span class="task-leaf icon icon-leaf" aria-hidden="true"></span>
        <div class="task-content">${escapeHtml(task.text)}</div>
      </div>
    `;
  }

  return `
    <div class="task-item clickable ${task.completed ? "complete" : ""}" data-task-id="${task.id}">
      <span class="task-leaf icon icon-leaf" aria-hidden="true"></span>
      <div class="task-content" data-field="text">${escapeHtml(task.text)}</div>
      <div class="task-actions">
        <button class="button ghost" data-action="delete" type="button">Убрать</button>
      </div>
    </div>
  `;
}
