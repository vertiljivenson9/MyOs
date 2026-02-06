// boot.js
// Inicializa el frontend de yOs

import { renderDesktop, openDesktopWindow } from "./ui/desktop.js";
import { updateTaskbar } from "./ui/taskbar.js";

// Inicializar Desktop y Taskbar
renderDesktop();
updateTaskbar();

// Abrir apps iniciales
(async () => {
  // Terminal
  const termWin = await openDesktopWindow("terminal", "Terminal yOs");
  
  // File Manager
  const fmWin = await openDesktopWindow("file-manager", "File Manager");

  // Settings
  const settingsWin = await openDesktopWindow("settings", "Settings");

  // Store (si existe)
  const storeWin = await openDesktopWindow("store", "yOs Store");
})();
