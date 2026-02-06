// ui.js
// UI de File Manager
import { listFiles, openFile } from "./index.js";

export function renderUI(container) {
  const fileList = document.createElement("ul");
  container.appendChild(fileList);

  async function refresh(path = "/") {
    fileList.innerHTML = "";
    const files = await listFiles(path);
    files.forEach(file => {
      const li = document.createElement("li");
      li.textContent = file.name + (file.type === "folder" ? "/" : "");
      li.style.cursor = "pointer";
      li.onclick = async () => {
        if (file.type === "folder") {
          refresh(file.path);
        } else {
          const content = await openFile(file.path);
          alert(`Contenido de ${file.name}:\n\n${content}`);
        }
      };
      fileList.appendChild(li);
    });
  }

  refresh();
}
