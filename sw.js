const CACHE_NAME = "gantt-v20";
// Agrega solo lo básico aquí para que no falle
const ASSETS = [
  "./",
  "index.html",
  "manifest.json",
  "css/estilos.css",
  "img/LOGO12.png",
  "img/maskable_icon_x192.png",
  "img/maskable_icon_x512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Esto evita que el error 'Request failed' detenga todo
      return Promise.allSettled(
        ASSETS.map(url => cache.add(url).catch(err => console.log("Falló: " + url)))
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((k) => k !== CACHE_NAME && caches.delete(k))
    ))
  );
  return self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});