// workers/store/index.js
import {
  registerApp,
  listApps,
  getApp
} from "./apps.registry.js";

import {
  installApp,
  purchaseApp
} from "./license.js";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const { action, data, user, app } = await request.json();

    try {
      switch (action) {
        case "store.register":
          registerApp(app, data);
          return Response.json({ status: "ok" });

        case "store.list":
          return Response.json({ status: "ok", apps: listApps() });

        case "store.get":
          return Response.json({ status: "ok", app: getApp(data.appId) });

        case "store.install":
          installApp(user, data.appId);
          return Response.json({ status: "ok" });

        case "store.purchase":
          purchaseApp(user, data.appId);
          return Response.json({ status: "ok" });

        default:
          return Response.json(
            { status: "error", error: "UNKNOWN_ACTION" },
            { status: 400 }
          );
      }
    } catch (err) {
      return Response.json(
        { status: "error", error: err.message },
        { status: 400 }
      );
    }
  }
};
