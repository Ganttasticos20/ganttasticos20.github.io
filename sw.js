/* Archivo Service Worker - Ganttásticos (VERSIÓN FINAL) */
const VERSION = "4.0"; 
const CACHE = "Ganttasticos-v4.0"; 

const ARCHIVOS = [
  "./",
  "index.html",
  "manifest.json", 
  "css/estilos.css",
  "img/LOGO.png",
  "img/LOGO12.png",
  "img/maskable_icon_x192.png",
  "img/maskable_icon_x512.png",
  "js/lib/registraServiceWorker.js"
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE).then((cache) => {
      // Usamos map y catch para que si un archivo falla, no detenga todo
      return Promise.allSettled(
        ARCHIVOS.map(url => cache.add(url))
      ).then(() => self.skipWaiting());
    })
  );
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
    caches.match(evt.request).then((res) => res || fetch(evt.request))
  );
});