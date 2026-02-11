const VERSION = "1.60";
const CACHE = "Ganttasticos-v1.53";

const ARCHIVOS = [
  "index.html",
  "site.webmanifest",
  "css/estilos.css",
  "img/LOGO.png",
  "img/Movil.png",
  "img/Escritorio.png",
  "js/lib/registraServiceWorker.js",
  "./"
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE).then((cache) => {
      // Usamos map para que si una imagen falla, las demás sigan
      return Promise.allSettled(
        ARCHIVOS.map(url => cache.add(url))
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    fetch(evt.request).catch(() => caches.match(evt.request))
  );
});