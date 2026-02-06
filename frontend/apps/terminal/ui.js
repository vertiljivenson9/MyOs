// ui.js
// UI de Terminal
import { executeCommand } from "./index.js";

export function renderUI(container) {
  container.innerHTML = "";

  const output = document.createElement("pre");
  output.style.flex = "1";
  output.style.background = "#000";
  output.style.color = "#0f0";
  output.style.padding = "8px";
  output.style.overflowY = "auto";
  container.appendChild(output);

  const input = document.createElement("input");
  input.type = "text";
  input.style.width = "100%";
  input.style.boxSizing = "border-box";
  input.style.padding = "8px";
  input.style.border = "none";
  input.style.outline = "none";
  input.style.background = "#111";
  input.style.color = "#0f0";
  container.appendChild(input);

  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const commandLine = input.value.trim();
      if (!commandLine) return;
      output.textContent += `$ ${commandLine}\n`;
      input.value = "";

      const [cmd, ...args] = commandLine.split(" ");
      const result = await executeCommand(cmd, args);
      output.textContent += result + "\n";
      output.scrollTop = output.scrollHeight;
    }
  });
}
