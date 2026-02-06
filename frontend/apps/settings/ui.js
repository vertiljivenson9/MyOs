// ui.js
// UI de Settings
import { getSetting, setSetting } from "./index.js";

export function renderUI(container) {
  container.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "Settings";
  container.appendChild(title);

  const themeLabel = document.createElement("label");
  themeLabel.textContent = "Theme: ";
  const themeInput = document.createElement("select");
  ["light", "dark"].forEach(option => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    themeInput.appendChild(opt);
  });
  themeLabel.appendChild(themeInput);
  container.appendChild(themeLabel);

  // Cargar valor real
  getSetting("theme").then(value => {
    if (value) themeInput.value = value;
  });

  themeInput.onchange = async () => {
    await setSetting("theme", themeInput.value);
    alert(`Theme actualizado a ${themeInput.value}`);
  };
}
