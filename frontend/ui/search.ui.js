// search.ui.js
// Buscador en tiempo real
export async function searchApps(query) {
  if (!query || query.trim() === "") return [];

  const resp = await fetch("/workers/search", {
    method: "POST",
    body: JSON.stringify({
      action: "search.query",
      data: { query }
    })
  });
  const json = await resp.json();
  return json.results || [];
}

// Render simple de resultados en frontend
export function renderSearchResults(results, container) {
  container.innerHTML = "";
  results.forEach(app => {
    const div = document.createElement("div");
    div.textContent = app.name + " - " + (app.price > 0 ? "$" + app.price : "Free");
    container.appendChild(div);
  });
}
