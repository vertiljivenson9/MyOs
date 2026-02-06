// index.js
// Control de la app Settings
import { renderUI } from "./ui.js";

// Inicializa la app Settings en una ventana específica
export async function initSettings(windowId) {
  const container = document.createElement("div");
  container.id = `settings-${windowId}`;
  container.style.width = "100%";
  container.style.height = "100%";

  renderUI(container);

  return container;
}

// Funciones para leer y escribir ajustes reales
export async function getSetting(key) {
  const resp = await fetch("/workers/fs", {
    method: "POST",
    body: JSON.stringify({
      action: "fs.read",
      data: { path: `/settings/${key}.json` }
    })
  });
  const json = await resp.json();
  return json.content || null;
}

export async function setSetting(key, value) {
  const resp = await fetch("/workers/fs", {
    method: "POST",
    body: JSON.stringify({
      action: "fs.write",
      data: { path: `/settings/${key}.json`, content: JSON.stringify(value) }
    })
  });
  const json = await resp.json();
  return json.success;
}
