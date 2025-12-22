const CACHE_NAME = "calmpixel-diary-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./styles/tokens.css",
  "./styles/base.css",
  "./styles/components.css",
  "./styles/pages.css",
  "./js/app.js",
  "./js/router.js",
  "./js/store.js",
  "./js/date.js",
  "./js/utils.js",
  "./js/views/home.js",
  "./js/views/today.js",
  "./js/views/feelings.js",
  "./js/views/summary.js",
  "./js/views/history.js",
  "./js/views/day.js",
  "./js/components/header.js",
  "./js/components/taskItem.js",
  "./js/components/calendar.js",
  "./js/components/moodGrid.js",
  "./assets/pixel/icon.png",
  "./assets/pixel/diary-cover.png",
  "./assets/icons/leaf.png",
  "./assets/icons/calendar.png",
  "./assets/icons/mood-happy.png",
  "./assets/icons/mood-sad.png",
  "./assets/icons/mood-neutral.png",
  "./assets/icons/sparkle.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.protocol === "chrome-extension:") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
