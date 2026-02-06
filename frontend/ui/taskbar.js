// taskbar.js
// Barra de tareas funcional
import { windowManager } from "./window.manager.js";

const taskbar = document.createElement("div");
taskbar.id = "taskbar";
taskbar.style.position = "absolute";
taskbar.style.bottom = "0";
taskbar.style.left = "0";
taskbar.style.width = "100%";
taskbar.style.height = "32px";
taskbar.style.background = "#333";
taskbar.style.display = "flex";
taskbar.style.alignItems = "center";
taskbar.style.padding = "0 8px";
document.body.appendChild(taskbar);

export function updateTaskbar() {
  taskbar.innerHTML = "";
  windowManager.listWindows().forEach(win => {
    const btn = document.createElement("button");
    btn.textContent = win.title;
    btn.style.marginRight = "4px";
    btn.onclick = () => windowManager.focusWindow(win.id);
    taskbar.appendChild(btn);
  });
}
