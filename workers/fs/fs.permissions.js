// workers/fs/fs.permissions.js
// Políticas de acceso al sistema de archivos

/**
 * Verifica si una app puede ejecutar una acción de FS
 * @param {Object} app - app que hace la petición
 * @param {string} action - acción solicitada
 * @returns {boolean}
 */
export function canAccess(app, action) {
  if (!app || !Array.isArray(app.permissions)) {
    return false;
  }

  // Permisos requeridos por acción
  const permissionMap = {
    "fs.create": "fs.write",
    "fs.write": "fs.write",
    "fs.delete": "fs.write",
    "fs.read": "fs.read",
    "fs.list": "fs.read"
  };

  const required = permissionMap[action];
  if (!required) {
    return false;
  }

  return app.permissions.includes(required);
}
