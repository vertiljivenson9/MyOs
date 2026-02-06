// workers/kernel/index.js
import {
  KERNEL_MESSAGES,
  APP_STATES,
  KERNEL_STATUS
} from "./protocol.js";

const kernelState = {
  apps: {},
  focus: null,
  bootTime: Date.now()
};

const FRONTEND_FILES = new Map();

const BASE_URL = "https://raw.githubusercontent.com/vertiljivenson9/MyOs/main/frontend/";

const FILES_TO_LOAD = [
  "index.html",
  "boot.js",
  "ui/desktop.js",
  "ui/taskbar.js",
  "ui/window.manager.js",
  "apps/terminal/app.json",
  "apps/terminal/index.js",
  "apps/terminal/ui.js",
  "apps/file-manager/app.json",
  "apps/file-manager/index.js",
  "apps/file-manager/ui.js",
  "apps/settings/app.json",
  "apps/settings/index.js",
  "apps/settings/ui.js",
  "apps/store/app.json",
  "apps/store/index.js",
  "apps/store/ui.js"
];

async function loadFrontendFiles() {
  await Promise.all(FILES_TO_LOAD.map(async (file) => {
    const url = BASE_URL + file;
    const content = await fetch(url).then(r => r.text());
    FRONTEND_FILES.set("/" + file, content);
  }));
}

await loadFrontendFiles();

function getContentType(path) {
  if (path.endsWith(".html")) return "text/html";
  if (path.endsWith(".js")) return "application/javascript";
  if (path.endsWith(".json")) return "application/json";
  return "text/plain";
}

async function handleRequest(req) {
  if (req.method === "GET") {
    const url = new URL(req.url);
    let path = url.pathname;
    if (path === "/") path = "/index.html";
    if (FRONTEND_FILES.has(path)) {
      return new Response(FRONTEND_FILES.get(path), {
        headers: { "Content-Type": getContentType(path) }
      });
    }
    return new Response("Not Found", { status: 404 });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return Response.json(
      { status: KERNEL_STATUS.ERROR, error: "INVALID_JSON" },
      { status: 400 }
    );
  }

  const { type, data } = payload;

  switch (type) {
    case KERNEL_MESSAGES.SYSTEM_PING:
      return Response.json({
        status: KERNEL_STATUS.OK,
        uptime: Date.now() - kernelState.bootTime
      });

    case KERNEL_MESSAGES.APP_REGISTER: {
      const { id, name, permissions } = data || {};
      if (!id || kernelState.apps[id]) {
        return Response.json({
          status: KERNEL_STATUS.ERROR,
          error: "INVALID_APP"
        });
      }
      kernelState.apps[id] = {
        id,
        name: name || id,
        permissions: permissions || [],
        state: APP_STATES.BACKGROUND,
        startedAt: Date.now()
      };
      return Response.json({ status: KERNEL_STATUS.OK });
    }

    case KERNEL_MESSAGES.APP_UNREGISTER: {
      const { id } = data || {};
      if (!id || !kernelState.apps[id]) {
        return Response.json({
          status: KERNEL_STATUS.ERROR,
          error: "APP_NOT_FOUND"
        });
      }
      delete kernelState.apps[id];
      if (kernelState.focus === id) kernelState.focus = null;
      return Response.json({ status: KERNEL_STATUS.OK });
    }

    case KERNEL_MESSAGES.APP_LIST:
      return Response.json({
        status: KERNEL_STATUS.OK,
        apps: Object.values(kernelState.apps)
      });

    case KERNEL_MESSAGES.APP_SET_STATE: {
      const { id, state } = data || {};
      if (!kernelState.apps[id] || !Object.values(APP_STATES).includes(state)) {
        return Response.json({
          status: KERNEL_STATUS.ERROR,
          error: "INVALID_STATE"
        });
      }
      kernelState.apps[id].state = state;
      return Response.json({ status: KERNEL_STATUS.OK });
    }

    case KERNEL_MESSAGES.FOCUS_SET: {
      const { id } = data || {};
      if (!kernelState.apps[id]) {
        return Response.json({
          status: KERNEL_STATUS.ERROR,
          error: "APP_NOT_FOUND"
        });
      }
      kernelState.focus = id;
      return Response.json({ status: KERNEL_STATUS.OK });
    }

    case KERNEL_MESSAGES.FOCUS_GET:
      return Response.json({
        status: KERNEL_STATUS.OK,
        focus: kernelState.focus
      });

    default:
      return Response.json(
        { status: KERNEL_STATUS.ERROR, error: "UNKNOWN_MESSAGE" },
        { status: 400 }
      );
  }
}

export default { fetch: handleRequest };
