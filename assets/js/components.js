/**
 * components.js - Funciones principales del proyecto Huellita PetShop.
 */
const SiteComponents = (() => {
  const CONFIG = window.APP_CONFIG || {};
  const CONTACT = CONFIG.CONTACT || {};
  const SOCIAL = CONFIG.SOCIAL || {};
  const SITE_NAME = CONFIG.SITE_NAME || "Huellita PetShop";
  const DELIVERY_NOTICE = CONTACT.deliveryNotice || "Envíos solo dentro de la GAM.";
  const CATEGORIES = [
    { label: "Perros", url: "productos.html?categoria=perros" },
    { label: "Gatos", url: "productos.html?categoria=gatos" },
    { label: "Aves", url: "productos.html?categoria=aves" },
    { label: "Peces", url: "productos.html?categoria=peces" },
    { label: "Especies pequeñas", url: "productos.html?categoria=roedores" },
  ];

  const DESKTOP_LINKS = [
    { label: "Inicio", url: "index.html", match: "index.html" },
    ...CATEGORIES,
  ];

  const MENU_GROUPS = [
    {
      id: "menuPerros",
      label: "Perros",
      links: [
        { label: "Todo", url: "productos.html?categoria=perros" },
        { label: "Accesorios", url: "productos.html?categoria=perros&categoriaProducto=accesorios" },
        { label: "Alimentos", url: "productos.html?categoria=perros&categoriaProducto=alimento" },
        { label: "Higiene", url: "productos.html?categoria=perros&categoriaProducto=higiene" },
        { label: "Salud", url: "productos.html?categoria=perros&categoriaProducto=salud" },
      ],
    },
    {
      id: "menuGatos",
      label: "Gatos",
      links: [
        { label: "Todo", url: "productos.html?categoria=gatos" },
        { label: "Accesorios", url: "productos.html?categoria=gatos&categoriaProducto=accesorios" },
        { label: "Alimentos", url: "productos.html?categoria=gatos&categoriaProducto=alimento" },
        { label: "Arena", url: "productos.html?categoria=gatos&categoriaProducto=arena" },
        { label: "Juguetes", url: "productos.html?categoria=gatos&categoriaProducto=juguetes" },
      ],
    },
  ];

  const SOCIAL_LINKS = [
    { label: "Instagram", icon: "bi-instagram", url: SOCIAL.instagram || "#" },
    { label: "Facebook", icon: "bi-facebook", url: SOCIAL.facebook || "#" },
    { label: "TikTok", icon: "bi-tiktok", url: SOCIAL.tiktok || "#" },
  ];

  const currentPage = () => window.location.pathname.split("/").pop() || "index.html";
  const isActive = (url, match) => currentPage() === (match || url.split("?")[0]);
  const logoLink = () => `
    <a aria-label="Ir al inicio de ${SITE_NAME}" class="navbar-brand brand-logo-link fw-bold fs-4 text-decoration-none" href="index.html">
      <img alt="Logo ${SITE_NAME}" class="brand-logo-img" src="assets/img/logo-petshop-una.png"/>
      <span>${SITE_NAME}</span>
    </a>`;

  const searchForm = (className, label = "Buscar productos") => `
    <form action="busqueda.html" aria-label="${label}" class="search-form ${className}" method="get" role="search">
      <input aria-label="Buscar productos" class="form-control" name="q" placeholder="Buscar productos" type="search"/>
      <button aria-label="Buscar" class="btn btn-search btn-search-icon" type="submit">
        <i aria-hidden="true" class="bi bi-search"></i><span class="visually-hidden">Buscar</span>
      </button>
    </form>`;

  const cartLink = (className, showText = true) => `
    <a aria-label="Carrito" class="${className} position-relative" href="carrito.html" title="Carrito">
      <i aria-hidden="true" class="bi bi-cart3"></i>
      ${showText ? "<span>Carrito</span>" : "<span class=\"visually-hidden\">Carrito</span>"}
      <span class="badge rounded-pill bg-danger cart-count">0</span>
    </a>`;

  const desktopMenu = () => DESKTOP_LINKS.map(({ label, url, match }) => `
    <li class="nav-item"><a class="nav-link px-0 ${isActive(url, match) ? "active" : ""}" ${isActive(url, match) ? 'aria-current="page"' : ''} href="${url}">${label}</a></li>`).join("");

  const menuGroup = ({ id, label, links }) => `
    <div class="menu-min-group">
      <button aria-controls="${id}" aria-expanded="false" class="menu-min-link menu-min-toggle" data-bs-target="#${id}" data-bs-toggle="collapse" type="button">
        <span>${label}</span><i aria-hidden="true" class="bi bi-chevron-right ms-auto"></i>
      </button>
      <div class="collapse menu-min-sublist" id="${id}">
        ${links.map(({ label: itemLabel, url }) => `<a href="${url}">${itemLabel}</a>`).join("")}
      </div>
    </div>`;

  const socialLinks = (className = "social-btn") => SOCIAL_LINKS.map(({ label, icon, url }) => `
    <a aria-label="${label}" class="${className}" href="${url}" rel="noopener noreferrer" target="_blank" title="${label}"><i aria-hidden="true" class="bi ${icon}"></i></a>`).join("");

  const header = () => `
    <header class="border-bottom bg-white fixed-top shadow-sm site-header">
      <nav aria-label="Navegación principal" class="container py-2">
        <div class="desktop-header d-none d-lg-block">
          <div class="desktop-top-row d-flex align-items-center gap-3">
            <div class="me-auto">${logoLink()}</div>
            ${searchForm("desktop-search-form")}
            ${cartLink("desktop-cart-link text-decoration-none fw-semibold")}
          </div>
          <div class="desktop-menu-row d-flex align-items-center border-top mt-2 pt-2">
            <ul class="navbar-nav desktop-main-menu flex-row align-items-center gap-4" role="list">${desktopMenu()}</ul>
          </div>
        </div>
        <div class="mobile-nav-block d-lg-none">
          <div class="nav-controls-row d-flex align-items-center gap-2 mb-2">
            <button aria-controls="menuCategorias" aria-label="Abrir menú de categorías" class="btn btn-bento-menu" data-bs-target="#menuCategorias" data-bs-toggle="offcanvas" title="Categorías" type="button">
              <i aria-hidden="true" class="bi bi-grid-3x3-gap-fill"></i>
            </button>
            <a aria-label="Inicio" class="nav-icon-link home-link ${isActive("index.html") ? "active" : ""}" href="index.html" title="Inicio">
              <i aria-hidden="true" class="bi bi-house-door"></i><span class="visually-hidden">Inicio</span>
            </a>
            <div class="mobile-brand-slot">${logoLink()}</div>
            ${cartLink("nav-icon-link cart-link", false)}
          </div>
          ${searchForm("search-priority-row")}
        </div>
      </nav>
      <div aria-labelledby="menuCategoriasLabel" class="offcanvas offcanvas-start petshop-offcanvas petshop-menu-min" data-bs-scroll="true" id="menuCategorias" tabindex="-1">
        <div class="offcanvas-header menu-min-header">
          <h5 class="offcanvas-title" id="menuCategoriasLabel">Categorías</h5>
          <button aria-label="Cerrar menú" class="btn menu-close-btn" data-bs-dismiss="offcanvas" type="button"><i aria-hidden="true" class="bi bi-x-lg"></i></button>
        </div>
        <div class="offcanvas-body menu-min-body">
          <nav aria-label="Menú de categorías" class="menu-min-nav">
            <div class="menu-min-primary">
              ${MENU_GROUPS.map(menuGroup).join("")}
              ${CATEGORIES.slice(2).map(({ label, url }) => `<a class="menu-min-link" href="${url}"><span>${label}</span></a>`).join("")}
              <a class="menu-min-link" href="#contactoFooter"><span>Contacto</span></a>
            </div>
            <div aria-label="Redes sociales" class="menu-social-links menu-lateral-redes">
              <span class="menu-social-title menu-lateral-redes-titulo">Redes sociales</span>
              <div class="menu-social-actions menu-lateral-redes-acciones">${socialLinks("menu-lateral-red-social")}</div>
            </div>
          </nav>
        </div>
      </div>
    </header>`;

  const footer = () => `
    <footer aria-label="Pie de página de ${SITE_NAME}" class="footer site-footer footer-minimal">
      <div class="container footer-minimal-grid">
        <div class="footer-about-min">
          <h5 class="footer-brand d-flex align-items-center gap-2">
            <img alt="Logo ${SITE_NAME}" class="footer-logo-img" src="assets/img/logo-petshop-una.png"/>
            <span>${SITE_NAME}</span>
          </h5>
          <p class="footer-text mb-0">Tu tienda para el bienestar de tus mascotas.</p>
        </div>
        <nav aria-label="Categorías del footer" class="footer-categories-min">
          <h6 class="footer-title">Categorías</h6>
          <div class="footer-pills">${CATEGORIES.map(({ label, url }) => `<a href="${url}">${label}</a>`).join("")}</div>
        </nav>
        <div class="footer-contact-min" id="contactoFooter">
          <h6 class="footer-title">Contacto</h6>
          <a aria-label="Enviar correo a ${SITE_NAME}" class="footer-contact-link" href="mailto:${CONTACT.email || 'petshopuna.cr@gmail.com'}"><i aria-hidden="true" class="bi bi-envelope"></i><span>${CONTACT.email || 'petshopuna.cr@gmail.com'}</span></a>
          <a aria-label="Consultar por WhatsApp" class="footer-contact-link footer-whatsapp-link" href="${SOCIAL.whatsapp || '#'}" rel="noopener noreferrer" target="_blank"><i aria-hidden="true" class="bi bi-whatsapp"></i><span>${CONTACT.whatsappText || 'Consultar por WhatsApp'}</span></a>
          <p class="footer-delivery-note"><i aria-hidden="true" class="bi bi-truck"></i><span>${DELIVERY_NOTICE}</span></p>
        </div>
        <div class="footer-social-min">
          <h6 class="footer-title">Redes</h6>
          <div aria-label="Redes sociales" class="footer-social">${socialLinks()}</div>
        </div>
      </div>
      <div class="container"><div class="footer-copy"><span class="footer-copy-desktop">© 2026 ${SITE_NAME} · Proyecto académico · Andrea Carrillo</span><span class="footer-copy-mobile">© 2026 ${SITE_NAME}</span></div></div>
    </footer>`;

  /**
 * Calcula la altura del header fijo para compensar el contenido.
 */
function syncHeaderOffset() {
    const siteHeader = document.querySelector(".site-header");
    if (!siteHeader) return;
    document.documentElement.style.setProperty("--site-header-height", `${siteHeader.offsetHeight}px`);
  }

  /**
 * Refuerza la posición fija del header.
 */
function lockHeaderPosition() {
    const siteHeader = document.querySelector(".site-header");
    if (!siteHeader) return;
    siteHeader.classList.add("fixed-top");
    Object.assign(siteHeader.style, {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      width: "100%",
      zIndex: "1080",
    });
    syncHeaderOffset();
  }

  /**
 * Sincroniza el botón del menú móvil entre abierto y cerrado.
 */
function syncMenuToggleState() {
    const menu = document.getElementById("menuCategorias");
    const toggle = document.querySelector(".btn-bento-menu");
    if (!menu || !toggle) return;

    const icon = toggle.querySelector("i");

    const setOpen = (isOpen) => {
      toggle.classList.toggle("is-menu-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Cerrar menú de categorías" : "Abrir menú de categorías");
      toggle.setAttribute("title", isOpen ? "Cerrar menú" : "Categorías");

      if (icon) {
        icon.className = `bi ${isOpen ? "bi-x-lg" : "bi-grid-3x3-gap-fill"}`;
      }
    };

    menu.addEventListener("show.bs.offcanvas", () => setOpen(true));
    menu.addEventListener("shown.bs.offcanvas", () => setOpen(true));
    menu.addEventListener("hide.bs.offcanvas", () => setOpen(false));
    menu.addEventListener("hidden.bs.offcanvas", () => setOpen(false));
  }

  /**
 * Monta los componentes compartidos de header y footer.
 */
function mount() {
    document.querySelectorAll('[data-component="site-header"]').forEach((el) => { el.outerHTML = header(); });
    document.querySelectorAll('[data-component="site-footer"]').forEach((el) => { el.outerHTML = footer(); });
    lockHeaderPosition();
    syncMenuToggleState();
    window.addEventListener("resize", lockHeaderPosition);
    window.addEventListener("orientationchange", lockHeaderPosition);
    window.addEventListener("load", lockHeaderPosition);
    setTimeout(lockHeaderPosition, 150);
    setTimeout(lockHeaderPosition, 500);
  }

  document.addEventListener("DOMContentLoaded", mount);

  return { mount, syncHeaderOffset, lockHeaderPosition, syncMenuToggleState };
})();
