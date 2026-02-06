// workers/store/license.js
// Gestión de licencias de aplicaciones

import { getApp } from "./apps.registry.js";

// userId -> Set(appId)
const licenses = new Map();

/**
 * Instala una app (gratis o ya comprada)
 */
export function installApp(user, appId) {
  if (!user || !user.id) {
    throw new Error("INVALID_USER");
  }

  const app = getApp(appId);

  if (app.price > 0 && !hasLicense(user.id, appId)) {
    throw new Error("LICENSE_REQUIRED");
  }

  grantLicense(user.id, appId);
}

/**
 * Compra una app
 * (el cobro real lo hará wallet luego)
 */
export function purchaseApp(user, appId) {
  if (!user || !user.id) {
    throw new Error("INVALID_USER");
  }

  const app = getApp(appId);

  if (app.price <= 0) {
    throw new Error("APP_IS_FREE");
  }

  if (hasLicense(user.id, appId)) {
    throw new Error("ALREADY_OWNED");
  }

  grantLicense(user.id, appId);
}

/**
 * Verifica si un usuario tiene licencia
 */
export function hasLicense(userId, appId) {
  return licenses.get(userId)?.has(appId) || false;
}

/**
 * Otorga licencia
 */
function grantLicense(userId, appId) {
  if (!licenses.has(userId)) {
    licenses.set(userId, new Set());
  }
  licenses.get(userId).add(appId);
}
