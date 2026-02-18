/* Archivo Service Worker - Ganttásticos (Versión Final Corregida) */
const VERSION = "1.73";
const CACHE = "Ganttasticos-v1.73";

const ARCHIVOS = [
  "index.html",
  "site.webmanifest",
  "css/estilos.css",
  "img/LOGO.png",
  "img/LOGO2.png",
  "img/analisis.png",
  "img/BALTA.png",
  "img/gyn.png",
  "img/FRENTEGANT.png",
  "img/HECTOR.png",
  "img/ITATI.png",
  "img/iu.png",
  "img/MENDIETA.png",
  "img/PSICO.png",
  "img/psicologos.png",
  "img/pwa.png",
  "img/ROBER.png",
  "img/sync.png",
  "img/Vanne.png",
  "img/web.png",
  "img/Movil.png",
  "img/Escritorio.png",
  "img/oficina.png",
  "js/lib/registraServiceWorker.js",
  "./"
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE).then((cache) => {
      // Usamos Promise.allSettled para que si falta una imagen, el SW se instale de todos modos
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