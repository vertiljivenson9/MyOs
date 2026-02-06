// index.js
// Control de la aplicación File Manager
import { renderUI } from "./ui.js";

// Función de inicialización
export async function initFileManager(windowId) {
  const container = document.createElement("div");
  container.id = `file-manager-${windowId}`;
  container.style.width = "100%";
  container.style.height = "100%";

  renderUI(container);

  return container;
}

// Función para listar archivos reales
export async function listFiles(path = "/") {
  const resp = await fetch("/workers/fs", {
    method: "POST",
    body: JSON.stringify({
      action: "fs.list",
      data: { path }
    })
  });
  const json = await resp.json();
  return json.files || [];
}

// Función para abrir archivo
export async function openFile(filePath) {
  const resp = await fetch("/workers/fs", {
    method: "POST",
    body: JSON.stringify({
      action: "fs.read",
      data: { path: filePath }
    })
  });
  const json = await resp.json();
  return json.content;
}
