// workers/window/index.js

import {
  createWindow,
  listWindows,
  minimizeWindow,
  maximizeWindow,
  restoreWindow,
  closeWindow,
  focusWindow
} from "./window.state.js";

import { computeLayout } from "./layout.engine.js";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const { action, data } = await request.json();

    try {
      switch (action) {
        case "window.open": {
          const win = createWindow(data);
          return Response.json({ status: "ok", window: win });
        }

        case "window.list":
          return Response.json({
            status: "ok",
            windows: listWindows()
          });

        case "window.minimize":
          minimizeWindow(data.id);
          return Response.json({ status: "ok" });

        case "window.maximize":
          maximizeWindow(data.id);
          return Response.json({ status: "ok" });

        case "window.restore":
          restoreWindow(data.id);
          return Response.json({ status: "ok" });

        case "window.close":
          closeWindow(data.id);
          return Response.json({ status: "ok" });

        case "window.focus":
          focusWindow(data.id);
          return Response.json({ status: "ok" });

        case "window.layout": {
          const layout = computeLayout(
            data.window,
            data.viewport
          );
          return Response.json({ status: "ok", layout });
        }

        default:
          return Response.json(
            { status: "error", error: "UNKNOWN_ACTION" },
            { status: 400 }
          );
      }
    } catch (err) {
      return Response.json({
        status: "error",
        error: err.message
      });
    }
  }
};
