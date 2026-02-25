const CACHE_NAME = "gantt-v50";
const ASSETS = [
  "./",
  "index.html",
  "manifest.json",
  "css/estilos.css",
  "img/BALTA.png",
  "img/HECTOR.png",
  "img/ITATI.png",
  "img/MENDIETA.png",
  "img/ROBER.png",
  "img/Vanne.png",
  "img/LOGO12.png",
  "img/maskable_icon_x192.png",
  "img/maskable_icon_x512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Promise.allSettled evita el error "Failed to execute addAll"
      return Promise.allSettled(
        ASSETS.map(url => cache.add(url).catch(err => console.log("Falta archivo: " + url)))
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.map((k) => k !== CACHE_NAME && caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});