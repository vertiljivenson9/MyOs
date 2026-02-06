// workers/search/query.js
import { _getIndex } from "./indexer.js";

/**
 * Ejecuta búsqueda sobre el índice
 */
export function search(query, limit = 10) {
  if (typeof query !== "string") {
    throw new Error("INVALID_QUERY");
  }

  const tokens = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  if (tokens.length === 0) {
    return [];
  }

  const index = _getIndex();
  const results = [];

  for (const [id, entry] of index.entries()) {
    let score = 0;

    for (const token of tokens) {
      if (entry.tokens.has(token)) {
        score++;
      }
    }

    if (score > 0) {
      results.push({
        id,
        score,
        meta: entry.meta
      });
    }
  }

  // Ranking simple: más coincidencias primero
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, limit);
}
