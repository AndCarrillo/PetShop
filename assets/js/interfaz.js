/**
 * Inicializa carruseles responsivos del sitio.
 */
function setupResponsiveCarousels() {
  const responsiveQuery = window.matchMedia("(max-width: 991.98px)");
  qsa(".responsive-carousel, .offers-showcase")
    .filter((track) => track.children.length > 1)
    .forEach((track, index) => initResponsiveCarousel(track, index, responsiveQuery));
}

/**
 * Configura el comportamiento de un carrusel responsivo.
 */
function initResponsiveCarousel(track, index, responsiveQuery) {
  if (!track.id) track.id = `responsiveCarousel${index + 1}`;
  let dots = track.parentElement?.querySelector(`.responsive-dots[data-carousel-for="${track.id}"]`);
  if (!dots) {
    dots = document.createElement("div");
    dots.className = "responsive-dots";
    dots.dataset.carouselFor = track.id;
    dots.setAttribute("aria-label", "Indicadores del carrusel");
    track.insertAdjacentElement("afterend", dots);
  }
  const getItems = () => [...track.children].filter((child) => child.offsetParent !== null);
  const getPages = () => {
    const items = getItems();
    if (!items.length) return 1;
    const itemWidth = items[0].getBoundingClientRect().width || track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0) || 0;
    const visible = Math.max(1, Math.floor((track.clientWidth + gap) / Math.max(1, itemWidth + gap)));
    return Math.max(1, Math.ceil(items.length / visible));
  };
  const updateDots = () => {
    if (!responsiveQuery.matches) return;
    const buttons = [...dots.children];
    const active = Math.min(buttons.length - 1, Math.round(track.scrollLeft / Math.max(1, track.clientWidth)));
    buttons.forEach((button, i) => button.classList.toggle("active", i === active));
  };
  const buildDots = () => {
    if (!responsiveQuery.matches) {
      dots.innerHTML = "";
      return;
    }
    dots.innerHTML = Array.from({ length: getPages() }, (_, i) => `<button type="button" class="responsive-dot" aria-label="Ir al grupo ${i + 1}"></button>`).join("");
    qsa("button", dots).forEach((button, i) => button.addEventListener("click", () => track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" })));
    updateDots();
  };
  track.addEventListener("scroll", () => requestAnimationFrame(updateDots), { passive: true });
  window.addEventListener("resize", buildDots);
  responsiveQuery.addEventListener?.("change", buildDots);
  setTimeout(buildDots, 160);
}

/**
 * Marca la navegación activa según la página actual.
 */
function updateActiveNav() {
  const url = new URL(window.location.href);
  const page = url.pathname.split("/").pop() || "index.html";
  const categoria = url.searchParams.get("categoria");
  qsa(".nav-link").forEach((link) => link.classList.remove("active"));
  if (categoria) qs(`.nav-link[href="productos.html?categoria=${categoria}"]`)?.classList.add("active");
  else if (page === "index.html" || page === "") qs('.nav-link[href="index.html"]')?.classList.add("active");
}

/**
 * Sincroniza acciones del menú móvil.
 */
function setupMobileMenuPropagation() {
  byId("menuCategorias")?.addEventListener("click", (event) => {
    if (event.target?.closest?.(".offcanvas-body")) event.stopPropagation();
  });
}
