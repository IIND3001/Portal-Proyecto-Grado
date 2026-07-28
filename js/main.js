/**
 * main.js
 * Pantalla de inicio del portal de Proyecto de Grado II.
 * Depende de js/data.js (debe cargarse antes que este archivo).
 */

(function () {
  "use strict";

  /* ---------- Modo oscuro ---------- */

  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("pg2-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeToggle.setAttribute("aria-pressed", theme === "dark");
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
    );
  }

  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("pg2-theme", next);
  });

  /* ---------- Ruta / línea de tiempo dinámica ---------- */

  const routeRail = document.getElementById("routeRail");
  const routeStatus = document.getElementById("routeStatus");
  const today = new Date();

  function renderRoute() {
    let currentIndex = ROUTE_MILESTONES.findIndex((m) => new Date(m.date) >= today);
    if (currentIndex === -1) currentIndex = ROUTE_MILESTONES.length; // ya pasó todo

    routeRail.innerHTML = ROUTE_MILESTONES.map((m, i) => {
      let state = "is-upcoming";
      if (i < currentIndex) state = "is-done";
      else if (i === currentIndex) state = "is-current";

      return `
        <li class="route-node ${state}">
          <div class="route-dot">${i < currentIndex ? "✓" : i + 1}</div>
          <div class="route-node-label">${m.label}</div>
          <div class="route-node-date">${m.dateDisplay}</div>
          <span class="route-node-badge">Estás aquí</span>
        </li>
      `;
    }).join("");

    if (currentIndex >= ROUTE_MILESTONES.length) {
      routeStatus.textContent = "Ya pasaste todos los hitos principales de este semestre.";
    } else {
      const current = ROUTE_MILESTONES[currentIndex];
      routeStatus.textContent = `Próximo hito: ${current.label} · ${current.detail}`;
    }
  }

  renderRoute();

  /* ---------- Tarjetas principales ---------- */

  const cardGrid = document.getElementById("cardGrid");

  const ICONS = {
    shield: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 5-3.2 8.4-7 10-3.8-1.6-7-5-7-10V6l7-3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 9.5h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none"><rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" stroke-width="1.6"/><path d="M6 11a6 6 0 0 0 12 0M12 17v3.5M9 20.5h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    folder: '<svg viewBox="0 0 24 24" fill="none"><path d="M3.5 7a1.5 1.5 0 0 1 1.5-1.5h4l2 2h9a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17V7Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    question: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M9.5 9.3a2.5 2.5 0 1 1 3.7 2.2c-.9.5-1.2 1-1.2 1.9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="17" r="0.9" fill="currentColor"/></svg>'
  };

  const ARROW = '<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function renderCards() {
    cardGrid.innerHTML = SECTIONS.map((s) => `
      <button class="section-card" data-id="${s.id}" type="button">
        <span class="card-icon">${ICONS[s.icon]}</span>
        <h3>${s.title}</h3>
        <p>${s.description}</p>
        <span class="card-arrow">Abrir sección ${ARROW}</span>
      </button>
    `).join("");

    cardGrid.querySelectorAll(".section-card").forEach((card) => {
      card.addEventListener("click", () => {
        // Las secciones individuales se construyen en el siguiente paso.
        // Por ahora, dejamos constancia clara en consola para no romper la demo.
        console.info(`[PG2] Sección "${card.dataset.id}" — pendiente de construir.`);
      });
    });
  }

  renderCards();

  /* ---------- Buscador ---------- */

  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  searchForm.addEventListener("submit", (e) => e.preventDefault());

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      searchResults.hidden = true;
      searchResults.innerHTML = "";
      return;
    }

    const matches = SECTIONS.filter((s) =>
      s.title.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query) ||
      s.keywords.some((k) => k.includes(query))
    );

    searchResults.hidden = false;
    searchResults.innerHTML = matches.length
      ? matches.map((s) => `
          <a href="#" data-id="${s.id}">
            ${s.title}
            <span>${s.description}</span>
          </a>
        `).join("")
      : `<div class="search-empty">Sin resultados para "${query}". Prueba con otra palabra.</div>`;
  });

  // Atajo de teclado "/" para enfocar el buscador (patrón Notion/Linear)
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  /* ---------- Botón volver arriba ---------- */

  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    backToTop.hidden = window.scrollY < 480;
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Enlace de feedback (placeholder) ---------- */

  document.getElementById("feedbackLink").addEventListener("click", (e) => {
    e.preventDefault();
    console.info("[PG2] Enlace de encuesta pendiente de definir con coordinación.");
  });

})();
