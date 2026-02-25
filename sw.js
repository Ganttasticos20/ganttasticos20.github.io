/* Archivo Service Worker - Ganttásticos (Versión Actualizada con Maskables) */
const VERSION = "1.78"; 
const CACHE = "Ganttasticos-v1.78"; // Actualizamos la versión de caché también

const ARCHIVOS = [
  "index.html",
  "site.webmanifest",
  "css/estilos.css",
  "img/LOGO.png",
  "img/LOGO2.png",
  "img/LOGO12.png",
  "img/LOGO92.png",
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
  // --- Nuevos Iconos Maskables ---
  "img/maskable_icon_x48.png",
  "img/maskable_icon_x72.png",
  "img/maskable_icon_x96.png",
  "img/maskable_icon_x128.png",
  "img/maskable_icon_x192.png",
  "img/maskable_icon_x384.png",
  "img/maskable_icon_x512.png",
  "img/maskable_icon.png",
  // -------------------------------
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