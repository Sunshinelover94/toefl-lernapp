/* Service Worker – cacht die App, damit sie nach dem ersten Laden offline läuft. */
const CACHE = "toefl-lernapp-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./audio/cr1.mp3",
  "./audio/cr2.mp3",
  "./audio/cr3.mp3",
  "./audio/conv1.mp3",
  "./audio/conv2.mp3",
  "./audio/conv3.mp3",
  "./audio/conv4.mp3",
  "./audio/conv5.mp3",
  "./audio/conv6.mp3",
  "./audio/ann.mp3",
  "./audio/talkOpp.mp3",
  "./audio/talkComp.mp3",
  "./audio/lr1.mp3",
  "./audio/lr2.mp3",
  "./audio/lr3.mp3",
  "./audio/lr4.mp3",
  "./audio/lr5.mp3",
  "./audio/lr6.mp3",
  "./audio/lr7.mp3"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first für eigene Dateien; Netz für alles andere.
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).catch(() => caches.match("./index.html")))
  );
});
