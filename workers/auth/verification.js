// workers/auth/verification.js
// Verificación básica de tokens

/**
 * Verifica un token simple
 * En esta fase, el token es el sessionId
 * @param {string} token
 * @returns {Object}
 */
export function verifyToken(token) {
  if (!token || typeof token !== "string") {
    return { valid: false };
  }

  // En v1 el token es opaco y solo valida forma
  // La validación real se conecta luego a session / KV
  return {
    valid: true,
    userId: null
  };
}
