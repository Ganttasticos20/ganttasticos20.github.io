// Registro del Service Worker corregido para la raíz
const nombreDeServiceWorker = "./sw.js"; 

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(nombreDeServiceWorker)
    .then(registro => {
      console.log("Service Worker registrado con éxito en:", registro.scope);
    })
    .catch(error => {
      console.log("Error al registrar el SW:", error);
    });
}

// Menú hamburguesa
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if(hamburger && navMenu){
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }
});