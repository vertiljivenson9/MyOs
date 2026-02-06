// workers/store/apps.registry.js
// Registro público de aplicaciones

const registry = new Map();

/**
 * Registra una aplicación en la tienda
 */
export function registerApp(app, data) {
  if (!app || !app.id) {
    throw new Error("INVALID_APP");
  }

  const {
    name,
    description = "",
    version,
    price = 0,
    permissions = []
  } = data || {};

  if (!name || !version) {
    throw new Error("INVALID_METADATA");
  }

  if (registry.has(app.id)) {
    throw new Error("APP_ALREADY_REGISTERED");
  }

  registry.set(app.id, {
    id: app.id,
    owner: app.owner || app.id,
    name,
    description,
    version,
    price,
    permissions,
    publishedAt: Date.now()
  });
}

/**
 * Lista apps públicas
 */
export function listApps() {
  return Array.from(registry.values());
}

/**
 * Obtiene metadata de una app
 */
export function getApp(appId) {
  const app = registry.get(appId);
  if (!app) {
    throw new Error("APP_NOT_FOUND");
  }
  return app;
}
