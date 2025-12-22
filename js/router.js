import { renderHeader } from "./components/header.js";
import { setLastRoute, loadState } from "./store.js";
import { renderHome } from "./views/home.js";
import { renderToday } from "./views/today.js";
import { renderFeelings } from "./views/feelings.js";
import { renderSummary } from "./views/summary.js";
import { renderHistory } from "./views/history.js";
import { renderDayDetails } from "./views/day.js";

const routes = {
  "/home": renderHome,
  "/today": renderToday,
  "/feelings": renderFeelings,
  "/summary": renderSummary,
  "/history": renderHistory,
  "/day": renderDayDetails,
};

function parseHash() {
  const hash = window.location.hash || "#/home";
  const cleaned = hash.replace(/^#/, "");
  const [pathPart, queryString] = cleaned.split("?");
  const path = pathPart.startsWith("/") ? pathPart : `/${pathPart}`;
  const params = new URLSearchParams(queryString || "");
  return { path, params, hash };
}

export function navigate(hash) {
  window.location.hash = hash;
}

export function renderRoute() {
  const { path, params, hash } = parseHash();
  const view = routes[path] || renderHome;
  const state = loadState();
  setLastRoute(hash);

  const shell = document.getElementById("shell");
  if (shell) {
    shell.className = "shell";
    shell.innerHTML = renderHeader(path);
  }

  const app = document.getElementById("app");
  if (!app) return;

  const { html, onMount, title } = view({
    state,
    params,
    navigate,
    rerender: renderRoute,
  });

  document.title = title || "MyTodo дневник";
  app.innerHTML = html;

  if (typeof onMount === "function") {
    onMount();
  }
}

export function initRouter() {
  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}
