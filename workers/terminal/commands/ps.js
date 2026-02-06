// workers/terminal/commands/ps.js

export default async function ps(args, context) {
  if (!context.kernelEndpoint) {
    throw new Error("KERNEL_ENDPOINT_NOT_DEFINED");
  }

  const res = await fetch(context.kernelEndpoint, {
    method: "POST",
    body: JSON.stringify({
      action: "kernel.ps",
      app: context.app
    })
  });

  const json = await res.json();

  if (json.status !== "ok") {
    throw new Error(json.error);
  }

  // Esperamos algo como:
  // [{ pid, name, state, owner }]
  return json.processes
    .map(
      (p) =>
        `${p.pid}\t${p.name}\t${p.state}\t${p.owner || "system"}`
    )
    .join("\n");
}
