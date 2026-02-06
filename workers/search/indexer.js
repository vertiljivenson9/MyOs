// workers/search/indexer.js
// Indexador simple en memoria

// Estructura:
// {
//   id: {
//     text: "...",
//     tokens: Set(),
//     meta: {}
//   }
// }

const index = new Map();

/**
 * Tokeniza texto
 */
function tokenize(text) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

/**
 * Indexa un ítem
 */
export function indexItem(id, text, meta = {}) {
  if (!id || typeof text !== "string") {
    throw new Error("INVALID_INDEX_DATA");
  }

  const tokens = new Set(tokenize(text));

  index.set(id, {
    text,
    tokens,
    meta
  });
}

/**
 * Elimina un ítem del índice
 */
export function removeItem(id) {
  if (!index.has(id)) {
    return;
  }
  index.delete(id);
}

/**
 * Acceso interno (solo para query)
 */
export function _getIndex() {
  return index;
}
