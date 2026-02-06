// workers/terminal/commands/ls.js

export default async function ls(args, context) {
  const path = args[0] || "/";

  const res = await fetch(context.fsEndpoint, {
    method: "POST",
    body: JSON.stringify({
      action: "fs.list",
      data: { path },
      app: context.app
    })
  });

  const json = await res.json();

  if (json.status !== "ok") {
    throw new Error(json.error);
  }

  return json.files.join("  ");
}
