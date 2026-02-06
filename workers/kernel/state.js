// workers/kernel/state.js
// Helpers puros para manejar el estado del kernel
// NO mantiene estado propio

import { APP_STATES } from "./protocol.js";

/**
 * Crea un estado inicial del kernel
 * Útil para migrar a KV / Durable Objects en el futuro
 */
export function createInitialState() {
  return {
    apps: {},
    focus: null,
    bootTime: Date.now()
  };
}

/**
 * Registra una app en el estado
 * @param {Object} state
 * @param {Object} app
 */
export function addApp(state, app) {
  if (!app || !app.id) {
    throw new Error("INVALID_APP");
  }

  if (state.apps[app.id]) {
    throw new Error("APP_ALREADY_EXISTS");
  }

  state.apps[app.id] = {
    id: app.id,
    name: app.name || app.id,
    permissions: app.permissions || [],
    state: APP_STATES.BACKGROUND,
    startedAt: Date.now()
  };
}

/**
 * Elimina una app del estado
 * @param {Object} state
 * @param {string} appId
 */
export function removeApp(state, appId) {
  if (!state.apps[appId]) {
    throw new Error("APP_NOT_FOUND");
  }

  delete state.apps[appId];

  if (state.focus === appId) {
    state.focus = null;
  }
}

/**
 * Obtiene una app del estado
 * @param {Object} state
 * @param {string} appId
 */
export function getApp(state, appId) {
  return state.apps[appId] || null;
}
