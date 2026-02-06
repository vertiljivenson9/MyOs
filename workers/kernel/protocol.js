// workers/kernel/protocol.js
// Contrato oficial del Kernel (NO lógica aquí)

// Tipos de mensajes que el kernel acepta
export const KERNEL_MESSAGES = Object.freeze({
  SYSTEM_PING: "kernel.system.ping",

  APP_REGISTER: "kernel.app.register",
  APP_UNREGISTER: "kernel.app.unregister",
  APP_LIST: "kernel.app.list",

  APP_SET_STATE: "kernel.app.set_state",
  APP_GET_STATE: "kernel.app.get_state",

  FOCUS_SET: "kernel.focus.set",
  FOCUS_GET: "kernel.focus.get"
});

// Estados válidos para una aplicación
export const APP_STATES = Object.freeze({
  FOREGROUND: "foreground",
  BACKGROUND: "background",
  MINIMIZED: "minimized",
  SUSPENDED: "suspended"
});

// Estados de respuesta estándar del kernel
export const KERNEL_STATUS = Object.freeze({
  OK: "ok",
  ERROR: "error",
  DENIED: "denied"
});
