/* Service Worker – cacht die App, damit sie nach dem ersten Laden offline läuft. */
const CACHE = "toefl-lernapp-v7";
// Shell-Assets müssen vorhanden sein (Install scheitert sonst); Audios werden fehlertolerant nachgecacht.
const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];
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
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(CORE);                 // Shell zwingend – schlägt fehl, wenn etwas fehlt
    const audio = ASSETS.filter((a) => a.startsWith("./audio/"));
    await Promise.allSettled(audio.map((a) => c.add(a)));  // einzelne MP3s fehlertolerant
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  // HTML/Navigation: network-first (frischer Stand nach Deploy), Cache nur als Offline-Fallback.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then((r) => { const cp = r.clone(); caches.open(CACHE).then((c) => c.put("./index.html", cp)); return r; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }
  // Statische Assets (Audio/Icons/Manifest): cache-first.
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
