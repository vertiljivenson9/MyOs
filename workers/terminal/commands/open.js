// workers/terminal/commands/open.js

export default async function open(args, context) {
  const target = args[0];
  if (!target) {
    throw new Error("OPEN_TARGET_REQUIRED");
  }

  // Archivo
  if (target.startsWith("/")) {
    const res = await fetch(context.fsEndpoint, {
      method: "POST",
      body: JSON.stringify({
        action: "fs.read",
        data: { path: target },
        app: context.app
      })
    });

    const json = await res.json();
    if (json.status !== "ok") {
      throw new Error(json.error);
    }

    return json.content;
  }

  // App
  return {
    action: "window.open",
    appId: target
  };
}
