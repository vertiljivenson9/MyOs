// workers/terminal/commands/kill.js

export default async function kill(args, context) {
  const pid = args[0];

  if (!pid) {
    throw new Error("PID_REQUIRED");
  }

  const res = await fetch(context.kernelEndpoint, {
    method: "POST",
    body: JSON.stringify({
      action: "kernel.kill",
      data: { pid },
      app: context.app
    })
  });

  const json = await res.json();

  if (json.status !== "ok") {
    throw new Error(json.error);
  }

  return `Process ${pid} terminated`;
}
