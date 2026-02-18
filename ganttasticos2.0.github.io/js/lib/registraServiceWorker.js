// Registro del Service Worker
// Usamos la ruta completa del repositorio para que GitHub Pages no duplique la URL
const nombreDeServiceWorker = "/ganttasticos2.0.github.io/sw.js";

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(nombreDeServiceWorker)
    .then(registro => {
      console.log("Service Worker registrado con éxito en:", registro.scope);
    })
    .catch(error => {
      console.log("Error al registrar el SW:", error);
    });
}

// Menú hamburguesa (lo incluyo aquí por si lo tienes en este mismo archivo)
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if(hamburger && navMenu){
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }
});