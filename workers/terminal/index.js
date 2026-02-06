// workers/terminal/index.js
import { executeCommand } from "./executor.js";

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

    const { command, context } = payload;

    try {
      const result = await executeCommand(command, context || {});
      return Response.json({
        status: "ok",
        output: result
      });
    } catch (err) {
      return Response.json({
        status: "error",
        error: err.message
      });
    }
  }
};
