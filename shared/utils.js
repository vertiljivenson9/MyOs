// shared/utils.js

/**
 * Genera un UUID v4
 */
export function generateUUID() {
  // crypto.randomUUID() si el entorno lo soporta
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // fallback simple
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Valida un ID alfanumérico simple
 */
export function validateId(id) {
  return /^[a-z0-9.-]+$/i.test(id);
}

/**
 * Formatea timestamp a fecha legible
 */
export function formatDate(ts) {
  const d = new Date(ts);
  return d.toISOString();
}

/**
 * Limita un valor a min y max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
