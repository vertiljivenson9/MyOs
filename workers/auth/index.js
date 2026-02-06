// workers/auth/index.js
import { createSession, validateSession } from "./session.js";
import { verifyToken } from "./verification.js";

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

    const { action, data } = payload;

    try {
      switch (action) {
        case "auth.login": {
          const { userId } = data || {};
          if (!userId) {
            return Response.json({
              status: "error",
              error: "INVALID_USER"
            });
          }

          const session = createSession(userId);
          return Response.json({
            status: "ok",
            session
          });
        }

        case "auth.verify": {
          const { token } = data || {};
          if (!token) {
            return Response.json({
              status: "error",
              error: "NO_TOKEN"
            });
          }

          const result = verifyToken(token);
          return Response.json({
            status: "ok",
            valid: result.valid,
            userId: result.userId || null
          });
        }

        case "auth.session.validate": {
          const { sessionId } = data || {};
          const valid = validateSession(sessionId);
          return Response.json({
            status: "ok",
            valid
          });
        }

        default:
          return Response.json(
            { status: "error", error: "UNKNOWN_ACTION" },
            { status: 400 }
          );
      }
    } catch (err) {
      return Response.json(
        { status: "error", error: err.message },
        { status: 403 }
      );
    }
  }
};
