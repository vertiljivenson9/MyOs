// workers/window/window.state.js

let nextWindowId = 1;

// windowId -> windowState
const windows = new Map();

/**
 * Crea una ventana
 */
export function createWindow({ appId, title }) {
  const id = nextWindowId++;

  const win = {
    id,
    appId,
    title: title || appId,
    minimized: false,
    maximized: false,
    zIndex: id,
    createdAt: Date.now()
  };

  windows.set(id, win);
  return win;
}

/**
 * Obtiene todas las ventanas
 */
export function listWindows() {
  return Array.from(windows.values());
}

/**
 * Minimiza una ventana
 */
export function minimizeWindow(id) {
  const win = windows.get(id);
  if (!win) throw new Error("WINDOW_NOT_FOUND");
  win.minimized = true;
  win.maximized = false;
}

/**
 * Maximiza una ventana
 */
export function maximizeWindow(id) {
  const win = windows.get(id);
  if (!win) throw new Error("WINDOW_NOT_FOUND");
  win.maximized = true;
  win.minimized = false;
}

/**
 * Restaura ventana
 */
export function restoreWindow(id) {
  const win = windows.get(id);
  if (!win) throw new Error("WINDOW_NOT_FOUND");
  win.minimized = false;
  win.maximized = false;
}

/**
 * Cierra ventana
 */
export function closeWindow(id) {
  if (!windows.has(id)) throw new Error("WINDOW_NOT_FOUND");
  windows.delete(id);
}

/**
 * Enfoca ventana (traer al frente)
 */
export function focusWindow(id) {
  const win = windows.get(id);
  if (!win) throw new Error("WINDOW_NOT_FOUND");

  const topZ = Math.max(
    0,
    ...Array.from(windows.values()).map(w => w.zIndex)
  );

  win.zIndex = topZ + 1;
}
