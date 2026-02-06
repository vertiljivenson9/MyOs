// workers/kernel/scheduler.js
// Scheduler lógico del kernel (no ejecución, solo estados)

import { APP_STATES } from "./protocol.js";

/**
 * Valida si un estado es válido
 * @param {string} state
 * @returns {boolean}
 */
export function isValidState(state) {
  return Object.values(APP_STATES).includes(state);
}

/**
 * Aplica reglas de transición de estado
 * @param {Object} kernelState - estado global del kernel
 * @param {string} appId - id de la app
 * @param {string} nextState - nuevo estado
 */
export function applyState(kernelState, appId, nextState) {
  if (!kernelState.apps[appId]) {
    throw new Error("APP_NOT_FOUND");
  }

  if (!isValidState(nextState)) {
    throw new Error("INVALID_STATE");
  }

  // Regla: solo una app puede estar en foreground
  if (nextState === APP_STATES.FOREGROUND) {
    for (const id in kernelState.apps) {
      if (id !== appId) {
        kernelState.apps[id].state = APP_STATES.BACKGROUND;
      }
    }
    kernelState.focus = appId;
  }

  kernelState.apps[appId].state = nextState;
}
