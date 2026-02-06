// workers/terminal/index.js

import kill from "./commands/kill.js";
import ls from "./commands/ls.js";
import open from "./commands/open.js";
import ps from "./commands/ps.js";

const COMMANDS = {
  ls,
  open,
  kill,
  ps
};

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

    const { input, context } = payload;

    if (!input || typeof input !== "string") {
      return Response.json(
        { status: "error", error: "INVALID_COMMAND" },
        { status: 400 }
      );
    }

    const parts = input.trim().split(/\s+/);
    const commandName = parts.shift();
    const args = parts;

    const command = COMMANDS[commandName];

    if (!command) {
      return Response.json({
        status: "error",
        error: `COMMAND_NOT_FOUND: ${commandName}`
      });
    }

    try {
      const output = await command(args, context || {});
      return Response.json({
        status: "ok",
        output
      });
    } catch (err) {
      return Response.json({
        status: "error",
        error: err.message
      });
    }
  }
};
