/* Archivo Service Worker - Ganttásticos (VERSIÓN DEFINITIVA) */
const VERSION = "3.0"; 
const CACHE = "Ganttasticos-v3.0"; 

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
      return cache.addAll(ARCHIVOS);
    }).then(() => self.skipWaiting())
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