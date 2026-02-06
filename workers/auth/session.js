// workers/auth/session.js
// Gestión simple de sesiones (memoria volátil)

const sessions = new Map();

/**
 * Crea una sesión nueva para un usuario
 * @param {string} userId
 * @returns {Object}
 */
export function createSession(userId) {
  const sessionId = crypto.randomUUID();
  const createdAt = Date.now();

  sessions.set(sessionId, {
    userId,
    createdAt
  });

  return {
    sessionId,
    userId,
    createdAt
  };
}

/**
 * Valida si una sesión existe
 * @param {string} sessionId
 * @returns {boolean}
 */
export function validateSession(sessionId) {
  return sessions.has(sessionId);
}

/**
 * Obtiene una sesión completa
 * (no se expone al exterior por ahora)
 */
export function getSession(sessionId) {
  return sessions.get(sessionId) || null;
}
