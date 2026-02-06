// index.js
// Control de la app Terminal
import { renderUI } from "./ui.js";

// Inicializa la terminal en una ventana específica
export async function initTerminal(windowId) {
  const container = document.createElement("div");
  container.id = `terminal-${windowId}`;
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.display = "flex";
  container.style.flexDirection = "column";

  renderUI(container);

  return container;
}

// Función para enviar comando real al worker terminal
export async function executeCommand(cmd, args = []) {
  const resp = await fetch("/workers/terminal", {
    method: "POST",
    body: JSON.stringify({
      action: "terminal.run",
      data: { cmd, args }
    })
  });
  const json = await resp.json();
  return json.result || json.error || "";
}
