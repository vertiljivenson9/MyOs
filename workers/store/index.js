// workers/store/index.js
import {
  publishApp,
  listApps,
  getApp
} from "./store.catalog.js";

import {
  installApp
} from "./store.installer.js";

import {
  purchaseApp
} from "./store.purchase.js";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return Response.json(
        { status: "error", error: "INVALID_JSON" },
        { status: 400 }
      );
    }

    const { action, data, user, app } = payload;

    try {
      switch (action) {
        case "store.publish":
          publishApp(app, data);
          return Response.json({ status: "ok" });

        case "store.list":
          return Response.json({
            status: "ok",
            apps: listApps()
          });

        case "store.get":
          return Response.json({
            status: "ok",
            app: getApp(data.appId)
          });

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
