// workers/search/index.js
import { indexItem, removeItem } from "./indexer.js";
import { search } from "./query.js";

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
        case "search.index": {
          const { id, text, meta } = data || {};
          indexItem(id, text, meta || {});
          return Response.json({ status: "ok" });
        }

        case "search.remove": {
          const { id } = data || {};
          removeItem(id);
          return Response.json({ status: "ok" });
        }

        case "search.query": {
          const { q, limit } = data || {};
          return Response.json({
            status: "ok",
            results: search(q || "", limit || 10)
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
        { status: 400 }
      );
    }
  }
};
