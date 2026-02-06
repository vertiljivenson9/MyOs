// desktop.js
// Inicializa el desktop y maneja ventanas en pantalla
import { openWindow } from "./window.manager.js";

const desktop = document.getElementById("desktop");

export function renderDesktop() {
  // Limpiar antes de render
  desktop.innerHTML = "";

  // Aquí se podrían iterar ventanas desde window manager
  const windows = windowManager.listWindows();
  windows.forEach(win => {
    const winDiv = document.createElement("div");
    winDiv.className = "window";
    winDiv.style.width = win.width + "px";
    winDiv.style.height = win.height + "px";
    winDiv.style.left = win.x + "px";
    winDiv.style.top = win.y + "px";
    winDiv.style.zIndex = win.zIndex;

    const header = document.createElement("div");
    header.className = "window-header";
    header.textContent = win.title;
    winDiv.appendChild(header);

    const body = document.createElement("div");
    body.className = "window-body";
    body.textContent = win.appId;
    winDiv.appendChild(body);

    desktop.appendChild(winDiv);
  });
}

// Permite abrir ventana desde frontend
export function openDesktopWindow(appId, title) {
  openWindow(appId, title);
}
