// workers/kernel/protocol.js

export const MSG = Object.freeze({
  // apps
  REGISTER_APP: "kernel.app.register",
  UNREGISTER_APP: "kernel.app.unregister",
  GET_APPS: "kernel.app.list",

  // lifecycle
  SET_STATE: "kernel.app.set_state",
  GET_STATE: "kernel.app.get_state",

  // focus & multitasking
  SET_FOCUS: "kernel.focus.set",
  GET_FOCUS: "kernel.focus.get",

  // system
  PING: "kernel.system.ping"
});

export const APP_STATES = Object.freeze({
  FOREGROUND: "foreground",
  BACKGROUND: "background",
  MINIMIZED: "minimized",
  SUSPENDED: "suspended"
});
