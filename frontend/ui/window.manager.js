// window.manager.js
// Maneja estado de ventanas en frontend y sincroniza con worker
export const windowManager = {
  windows: [],

  async openWindow(appId, title) {
    const resp = await fetch("/workers/window", {
      method: "POST",
      body: JSON.stringify({
        action: "window.open",
        data: { appId, title }
      })
    });
    const json = await resp.json();
    const win = json.window;

    // Calcular layout real
    const layoutResp = await fetch("/workers/window", {
      method: "POST",
      body: JSON.stringify({
        action: "window.layout",
        data: {
          window: win,
          viewport: { width: window.innerWidth, height: window.innerHeight, isMobile: window.innerWidth < 768 }
        }
      })
    });
    const layoutJson = await layoutResp.json();
    Object.assign(win, layoutJson.layout);

    this.windows.push(win);
    return win;
  },

  listWindows() {
    return this.windows;
  },

  focusWindow(id) {
    const win = this.windows.find(w => w.id === id);
    if (!win) return;
    win.zIndex = Math.max(...this.windows.map(w => w.zIndex)) + 1;
    // Re-render taskbar y desktop
    import("./desktop.js").then(module => module.renderDesktop());
    import("./taskbar.js").then(module => module.updateTaskbar());
  }
};
