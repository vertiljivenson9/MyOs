// workers/kernel/index.js
import {
  KERNEL_MESSAGES,
  APP_STATES,
  KERNEL_STATUS
} from "./protocol.js";

// Estado interno del kernel (memoria volátil por ahora)
const kernelState = {
  apps: {},
  focus: null,
  bootTime: Date.now()
};

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return Response.json(
        { status: KERNEL_STATUS.ERROR, error: "INVALID_JSON" },
        { status: 400 }
      );
    }

    const { type, data } = payload;

    switch (type) {
      case KERNEL_MESSAGES.SYSTEM_PING:
        return Response.json({
          status: KERNEL_STATUS.OK,
          uptime: Date.now() - kernelState.bootTime
        });

      case KERNEL_MESSAGES.APP_REGISTER: {
        const { id, name, permissions } = data || {};
        if (!id || kernelState.apps[id]) {
          return Response.json({
            status: KERNEL_STATUS.ERROR,
            error: "INVALID_APP"
          });
        }

        kernelState.apps[id] = {
          id,
          name: name || id,
          permissions: permissions || [],
          state: APP_STATES.BACKGROUND,
          startedAt: Date.now()
        };

        return Response.json({ status: KERNEL_STATUS.OK });
      }

      case KERNEL_MESSAGES.APP_UNREGISTER: {
        const { id } = data || {};
        if (!id || !kernelState.apps[id]) {
          return Response.json({
            status: KERNEL_STATUS.ERROR,
            error: "APP_NOT_FOUND"
          });
        }

        delete kernelState.apps[id];
        if (kernelState.focus === id) {
          kernelState.focus = null;
        }

        return Response.json({ status: KERNEL_STATUS.OK });
      }

      case KERNEL_MESSAGES.APP_LIST:
        return Response.json({
          status: KERNEL_STATUS.OK,
          apps: Object.values(kernelState.apps)
        });

      case KERNEL_MESSAGES.APP_SET_STATE: {
        const { id, state } = data || {};
        if (!kernelState.apps[id] || !Object.values(APP_STATES).includes(state)) {
          return Response.json({
            status: KERNEL_STATUS.ERROR,
            error: "INVALID_STATE"
          });
        }

        kernelState.apps[id].state = state;
        return Response.json({ status: KERNEL_STATUS.OK });
      }

      case KERNEL_MESSAGES.FOCUS_SET: {
        const { id } = data || {};
        if (!kernelState.apps[id]) {
          return Response.json({
            status: KERNEL_STATUS.ERROR,
            error: "APP_NOT_FOUND"
          });
        }

        kernelState.focus = id;
        return Response.json({ status: KERNEL_STATUS.OK });
      }

      case KERNEL_MESSAGES.FOCUS_GET:
        return Response.json({
          status: KERNEL_STATUS.OK,
          focus: kernelState.focus
        });

      default:
        return Response.json(
          { status: KERNEL_STATUS.ERROR, error: "UNKNOWN_MESSAGE" },
          { status: 400 }
        );
    }
  }
};
