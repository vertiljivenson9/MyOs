// workers/fs/fs.state.js
// Sistema de archivos virtual (memoria volátil)

// Estructura base:
// {
//   "/": {
//     type: "dir",
//     children: {
//       "file.txt": { type: "file", content: "..." }
//     }
//   }
// }

const fsTree = {
  "/": { type: "dir", children: {} }
};

/**
 * Normaliza una ruta
 */
function normalizePath(path) {
  if (!path || typeof path !== "string") {
    throw new Error("INVALID_PATH");
  }
  if (!path.startsWith("/")) path = "/" + path;
  return path.replace(/\/+/g, "/");
}

/**
 * Obtiene el nodo padre y el nombre final
 */
function getParentNode(path) {
  const parts = normalizePath(path).split("/").filter(Boolean);
  let current = fsTree["/"];

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const next = current.children[part];
    if (!next || next.type !== "dir") {
      throw new Error("PATH_NOT_FOUND");
    }
    current = next;
  }

  return {
    parent: current,
    name: parts[parts.length - 1]
  };
}

/**
 * Crea un archivo
 */
export function createFile(path, content = "") {
  const { parent, name } = getParentNode(path);

  if (parent.children[name]) {
    throw new Error("FILE_EXISTS");
  }

  parent.children[name] = {
    type: "file",
    content: String(content)
  };
}

/**
 * Lee un archivo
 */
export function readFile(path) {
  const { parent, name } = getParentNode(path);
  const node = parent.children[name];

  if (!node || node.type !== "file") {
    throw new Error("FILE_NOT_FOUND");
  }

  return node.content;
}

/**
 * Escribe en un archivo existente
 */
export function writeFile(path, content) {
  const { parent, name } = getParentNode(path);
  const node = parent.children[name];

  if (!node || node.type !== "file") {
    throw new Error("FILE_NOT_FOUND");
  }

  node.content = String(content);
}

/**
 * Elimina un archivo
 */
export function deleteFile(path) {
  const { parent, name } = getParentNode(path);

  if (!parent.children[name]) {
    throw new Error("FILE_NOT_FOUND");
  }

  delete parent.children[name];
}

/**
 * Lista archivos de un directorio
 */
export function listFiles(path = "/") {
  const normalized = normalizePath(path);
  let current = fsTree["/"];

  if (normalized !== "/") {
    const parts = normalized.split("/").filter(Boolean);
    for (const part of parts) {
      const next = current.children[part];
      if (!next || next.type !== "dir") {
        throw new Error("PATH_NOT_FOUND");
      }
      current = next;
    }
  }

  return Object.keys(current.children);
}
