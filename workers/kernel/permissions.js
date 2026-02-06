// workers/kernel/permissions.js
// Control básico de permisos del kernel

/**
 * Verifica si una app tiene un permiso específico
 * @param {Object} app - objeto app registrado en el kernel
 * @param {string} permission - permiso requerido
 * @returns {boolean}
 */
export function hasPermission(app, permission) {
  if (!app || !Array.isArray(app.permissions)) {
    return false;
  }
  return app.permissions.includes(permission);
}

/**
 * Verificación estricta: lanza error si no tiene permiso
 * El kernel decidirá cómo responder
 * @param {Object} app
 * @param {string} permission
 */
export function requirePermission(app, permission) {
  if (!hasPermission(app, permission)) {
    throw new Error("PERMISSION_DENIED");
  }
}
