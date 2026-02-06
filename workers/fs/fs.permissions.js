// workers/fs/index.js
import {
  createFile,
  readFile,
  writeFile,
  deleteFile,
  listFiles
} from "./fs.state.js";

import { canAccess } from "./fs.permissions.js";

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

    const { action, data, app } = payload;

    try {
      // Verificación mínima de acceso
      if (!canAccess(app, action)) {
        return Response.json({
          status: "denied",
          error: "ACCESS_DENIED"
        });
      }

      switch (action) {
        case "fs.create":
          createFile(data.path, data.content || "");
          return Response.json({ status: "ok" });

        case "fs.read":
          return Response.json({
            status: "ok",
            content: readFile(data.path)
          });

        case "fs.write":
          writeFile(data.path, data.content);
          return Response.json({ status: "ok" });

        case "fs.delete":
          deleteFile(data.path);
          return Response.json({ status: "ok" });

        case "fs.list":
          return Response.json({
            status: "ok",
            files: listFiles(data.path)
          });

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
