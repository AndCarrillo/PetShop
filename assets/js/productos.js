const CATEGORY_NAMES = { perros: "Perros", gatos: "Gatos", aves: "Aves", peces: "Peces", roedores: "Especies pequeñas" };
const DEFAULT_CATEGORY_OPTIONS = [
  ["", "Todos"], ["alimento", "Alimento"], ["accesorios", "Accesorios"],
  ["juguetes", "Juguetes"], ["higiene", "Higiene"], ["salud", "Salud"],
];
const CATEGORY_FILTER_OPTIONS = {
  perros: [["", "Todos"], ["alimento", "Alimentos"], ["juguetes", "Juguetes"], ["accesorios", "Accesorios"], ["higiene", "Higiene"]],
  gatos: [["", "Todos"], ["alimento", "Alimentos"], ["arena", "Arena"], ["juguetes", "Juguetes"], ["accesorios", "Accesorios"]],
};

/**
 * Busca un producto por identificador en el catálogo.
 */
function getProduct(id) {
  return PRODUCTS.find((product) => product.id === Number(id));
}


/**
 * Genera la tarjeta HTML de un producto.
 */
function productCard(product) {
  return `
    <div class="col-6 col-md-4 col-lg-3">
      <article class="card product-card h-100 shadow-sm">
        <img src="${product.imagen}" alt="${product.nombre}" class="card-img-top product-img">
        <div class="card-body d-flex flex-column">
          <span class="badge badge-soft align-self-start mb-2">${prettyCategoryName(product.tipo)}</span>
          <h5 class="card-title product-card-title mb-2">${product.nombre}</h5>
          <p class="price mb-3">${money(product.precio)}</p>
          <div class="mt-auto d-flex gap-2">
            <a class="btn btn-outline-primary btn-sm flex-fill" href="detalle.html?id=${product.id}">Ver detalle</a>
            <button class="btn btn-primary btn-sm px-3" type="button" onclick="addToCart(${product.id})" aria-label="Agregar al carrito" title="Agregar al carrito"><i class="bi bi-cart-plus"></i></button>
          </div>
        </div>
      </article>
    </div>`;
}

/**
 * Renderiza un conjunto de productos en el contenedor indicado.
 */
function renderProducts(targetId, products = PRODUCTS) {
  const container = byId(targetId);
  if (!container) return;
  container.innerHTML = products.length
    ? products.map(productCard).join("")
    : `<div class="col-12"><div class="alert alert-pet">No se encontraron productos para esta búsqueda.</div></div>`;
}

/**
 * Convierte una categoría técnica en texto legible.
 */
function prettyCategoryName(value) {
  const key = slugify(value);
  return CATEGORY_NAMES[key] || (value ? value.charAt(0).toUpperCase() + value.slice(1) : "Catálogo");
}

/**
 * Actualiza la ruta visual de la página de productos.
 */
function updateProductBreadcrumb(categoria) {
  const el = byId("breadcrumbCategory");
  if (el) el.textContent = prettyCategoryName(categoria);
}

/**
 * Actualiza la ruta visual de la página de detalle.
 */
function updateDetailBreadcrumb(product) {
  const bc = byId("detailBreadcrumb");
  if (!bc || !product) return;
  const categoria = slugify(product.tipo);
  bc.innerHTML = `
    <li class="breadcrumb-item"><a href="index.html">Inicio</a></li>
    <li class="breadcrumb-item"><a href="index.html#categorias">Categorías</a></li>
    <li class="breadcrumb-item"><a href="productos.html?categoria=${categoria}">${prettyCategoryName(product.tipo)}</a></li>
    <li class="breadcrumb-item active" aria-current="page">${product.nombre}</li>`;
}

/**
 * Actualiza las opciones de filtro según la mascota seleccionada.
 */
function setCategoryProductOptions(categoria) {
  const select = byId("categoria");
  if (!select) return;
  const options = CATEGORY_FILTER_OPTIONS[slugify(categoria)] || DEFAULT_CATEGORY_OPTIONS;
  select.innerHTML = options.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
}

/**
 * Valida si un producto pertenece a la categoría seleccionada.
 */
function matchesProductCategory(product, value) {
  const filter = slugify(value);
  if (!filter) return true;
  if (filter === "arena") {
    return slugify(product.tipo) === "gatos" && slugify(`${product.nombre} ${product.descripcion} ${product.atributos}`).includes("arena");
  }
  return slugify(product.categoria) === filter;
}

/**
 * Configura los filtros de la página de productos.
 */
function setupProductFilters() {
  const form = byId("productFilters");
  if (!form) return;
  const categoria = new URLSearchParams(location.search).get("categoria") || "";
  const tipoSelect = byId("tipo");
  if (byId("currentCategoria")) byId("currentCategoria").disabled = true;
  if (tipoSelect) {
    tipoSelect.name = "categoria";
    tipoSelect.value = categoria;
    tipoSelect.addEventListener("change", () => setCategoryProductOptions(tipoSelect.value));
  }
  setCategoryProductOptions(categoria);
  if (byId("clearProductFilters")) byId("clearProductFilters").href = "productos.html";
}

/**
 * Configura el envío del formulario de búsqueda avanzada.
 */
function setupSearchFiltersSubmit() {
  const form = byId("searchFilters");
  if (!form) return;
  form.addEventListener("submit", () => {
    const desktopInput = byId("q");
    const mobileInput = byId("qMobile");
    const isMobile = window.matchMedia("(max-width: 767.98px)").matches;
    if (!desktopInput || !mobileInput) return;
    desktopInput.disabled = isMobile;
    mobileInput.disabled = !isMobile;
    (isMobile ? mobileInput : desktopInput).name = "q";
  });
}

/**
 * Sincroniza los filtros visuales con los parámetros actuales.
 */
function syncSearchFilters({ query, tipo, categoriaProducto, precioMax, orden }) {
  const values = { q: query || "", qMobile: query || "", tipo: tipo || "", categoria: categoriaProducto || "", precioMax: precioMax ? String(precioMax) : "", orden: orden || "" };
  Object.entries(values).forEach(([id, value]) => { if (byId(id)) byId(id).value = value; });
}

/**
 * Filtra y ordena productos según los criterios seleccionados.
 */
function filterProducts({ categoria, tipo, categoriaProducto, precioMax, query, orden }) {
  const search = (query || "").toLowerCase().trim();
  const filters = [
    (product) => !categoria || slugify(product.tipo) === slugify(categoria),
    (product) => !tipo || slugify(product.tipo) === slugify(tipo),
    (product) => !categoriaProducto || matchesProductCategory(product, categoriaProducto),
    (product) => !precioMax || Number(product.precio) <= Number(precioMax),
    (product) => !search || `${product.nombre} ${product.descripcion} ${product.categoria} ${product.tipo} ${product.atributos}`.toLowerCase().includes(search),
  ];
  const products = PRODUCTS.filter((product) => filters.every((filter) => filter(product)));
  const sorters = {
    "precio-asc": (a, b) => Number(a.precio) - Number(b.precio),
    "precio-desc": (a, b) => Number(b.precio) - Number(a.precio),
    "nombre-asc": (a, b) => a.nombre.localeCompare(b.nombre, "es"),
  };
  return sorters[orden] ? products.sort(sorters[orden]) : products;
}

/**
 * Renderiza la página de productos con filtros y paginación.
 */
function renderProductsPage() {
  const grid = byId("productsGrid");
  if (!grid) return;
  const params = new URLSearchParams(location.search);
  const data = {
    categoria: params.get("categoria"),
    tipo: params.get("tipo"),
    categoriaProducto: params.get("categoriaProducto"),
    precioMax: Number(params.get("precioMax") || 0),
    orden: params.get("orden") || "",
    query: (params.get("q") || "").toLowerCase().trim(),
  };
  const page = Math.max(1, Number(params.get("page") || 1));
  const products = filterProducts(data);
  const totalPages = Math.max(1, Math.ceil(products.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const countText = `${products.length} producto${products.length === 1 ? "" : "s"}`;
  updateProductBreadcrumb(data.categoria);
  setProductPageTitle(data);
  if (byId("resultCount")) byId("resultCount").textContent = countText;
  qsa(".result-count-mobile").forEach((el) => { el.textContent = countText; });
  syncSearchFilters({ ...data, tipo: data.categoria || data.tipo });
  renderProducts("productsGrid", products.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE));
  renderPagination(totalPages, safePage, data);
}

/**
 * Actualiza el título y descripción de resultados.
 */
function setProductPageTitle({ query, tipo, categoria, categoriaProducto, precioMax }) {
  const title = byId("pageTitle");
  if (!title) return;
  if (query || tipo || categoriaProducto || precioMax) title.textContent = "Resultados";
  else if (categoria) title.textContent = `Productos para ${prettyCategoryName(categoria.replaceAll("-", " "))}`;
  else title.textContent = "Catálogo de productos";
}

/**
 * Genera los controles de paginación.
 */
function renderPagination(totalPages, currentPage, { categoria, query, tipo, categoriaProducto, precioMax, orden }) {
  const container = byId("paginationContainer");
  if (!container) return;
  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }
  const basePage = location.pathname.includes("busqueda") ? "busqueda.html" : "productos.html";
  const buildUrl = (page) => {
    const params = new URLSearchParams();
    Object.entries({ categoria, q: query, tipo, categoriaProducto, precioMax, orden, page }).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    return `${basePage}?${params.toString()}`;
  };
  const items = Array.from({ length: totalPages }, (_, i) => {
    const page = i + 1;
    return `<li class="page-item ${page === currentPage ? "active" : ""}"><a class="page-link" href="${buildUrl(page)}">${page}</a></li>`;
  }).join("");
  container.innerHTML = `<nav aria-label="Paginación de productos"><ul class="pagination pagination-sm justify-content-center mb-0">${items}</ul></nav>`;
}

/**
 * Renderiza el detalle del producto seleccionado.
 */
function renderDetail() {
  const container = byId("detailContent");
  if (!container) return;
  const product = getProduct(new URLSearchParams(location.search).get("id") || 1) || PRODUCTS[0];
  updateDetailBreadcrumb(product);
  container.innerHTML = `
    <nav class="detail-return-nav" aria-label="Navegación de detalle de producto">
      <button class="btn btn-primary detail-back-link" type="button" onclick="history.length > 1 ? history.back() : window.location.href='productos.html';"><i class="bi bi-arrow-left" aria-hidden="true"></i> Volver</button>
    </nav>
    <div class="row g-4 align-items-center detail-layout">
      <div class="col-12 col-md-5 col-lg-5"><div class="detail-image-box"><img src="${product.imagen}" class="img-fluid detail-img" alt="${product.nombre}"></div></div>
      <div class="col-12 col-md-7 col-lg-7">
        <span class="badge badge-soft mb-2">${product.tipo} · ${product.categoria}</span>
        <h1 class="fw-bold detail-title">${product.nombre}</h1>
        <p class="lead text-muted detail-description">${product.descripcion}</p>
        <p class="price fs-2">${money(product.precio)}</p>
        <p class="detail-attributes"><strong>Atributos:</strong> ${product.atributos}</p>
        <div class="detail-actions">
          <button class="btn btn-primary detail-add-btn" onclick="addToCart(${product.id})"><i class="bi bi-cart-plus" aria-hidden="true"></i> Agregar al carrito</button>
          <button class="btn detail-buy-btn" type="button" onclick="addToCart(${product.id}); window.location.href='carrito.html';"><i class="bi bi-bag-check" aria-hidden="true"></i> Comprar ahora</button>
        </div>
      </div>
    </div>`;
  const related = PRODUCTS
    .filter((item) => item.id !== product.id)
    .sort((a, b) => Number(b.tipo === product.tipo) - Number(a.tipo === product.tipo))
    .slice(0, 8);
  renderProducts("relatedGrid", related);
  setupRelatedDots();
}

/**
 * Sincroniza los indicadores del carrusel de productos relacionados.
 */
function setupRelatedDots() {
  const scroller = byId("relatedGrid");
  const dots = byId("relatedDots");
  const controls = byId("relatedDesktopControls");
  if (!scroller || !dots) return;
  const items = [...scroller.children];
  const isDesktop = () => window.matchMedia("(min-width: 992px)").matches;
  const getPageCount = () => isDesktop() ? 0 : Math.max(1, Math.ceil(items.length / (window.matchMedia("(min-width: 576px)").matches ? 3 : 2)));
  const update = () => {
    const buttons = qsa("button", dots);
    const page = Math.min(buttons.length - 1, Math.round(scroller.scrollLeft / Math.max(scroller.clientWidth, 1)));
    buttons.forEach((button, index) => button.classList.toggle("active", index === page));
  };
  const render = () => {
    const showControls = isDesktop() && items.length > 4;
    scroller.classList.toggle("has-desktop-arrows", showControls);
    controls?.classList.toggle("d-none", !showControls);
    const pages = getPageCount();
    dots.innerHTML = pages ? Array.from({ length: pages }, (_, i) => `<button type="button" aria-label="Ver grupo ${i + 1}" data-page="${i}" class="${i === 0 ? "active" : ""}"></button>`).join("") : "";
    qsa("button", dots).forEach((button) => button.addEventListener("click", () => scroller.scrollTo({ left: Number(button.dataset.page || 0) * scroller.clientWidth, behavior: "smooth" })));
  };
  controls?.querySelectorAll("[data-related-dir]").forEach((button) => button.addEventListener("click", () => {
    const card = qs("[class*='col']", scroller);
    const step = card ? card.getBoundingClientRect().width + 16 : scroller.clientWidth;
    scroller.scrollBy({ left: (button.dataset.relatedDir === "prev" ? -1 : 1) * step, behavior: "smooth" });
  }));
  render();
  scroller.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", () => { render(); update(); });
}
