
const VERSION = "2.0" 
const CACHE = "Ganttasticos-v1.85"; 

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
  "img/maskable_icon_x48.png",
  "img/maskable_icon_x72.png",
  "img/maskable_icon_x96.png",
  "img/maskable_icon_x128.png",
  "img/maskable_icon_x192.png",
  "img/maskable_icon_x384.png",
  "img/maskable_icon_x512.png",
  "img/maskable_icon.png",
  "js/lib/registraServiceWorker.js",
  "./"
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE).then((cache) => {
      // Promise.allSettled permite que si falta un archivo, los demás sí se guarden
      return Promise.allSettled(
        ARCHIVOS.map(url => cache.add(url).catch(err => console.log("No se pudo cachear:", url)))
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