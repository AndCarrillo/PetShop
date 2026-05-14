
const PRODUCTS = [
  {id:1,nombre:"Pedigree High Protein Res y Pollo 4kg",descripcion:"Alimento para perro adulto con proteína y sabor res y pollo.",categoria:"Alimento",tipo:"Perros",precio:12500,imagen:"assets/img/productos/pedigree4kg.png",atributos:"4 kg | Adulto | Res y pollo"},
  {id:2,nombre:"Dog Chow Cachorro 2kg",descripcion:"Alimento para cachorros medianos y grandes.",categoria:"Alimento",tipo:"Perros",precio:9800,imagen:"assets/img/productos/dogchow2kg.png",atributos:"2 kg | Cachorros | Medianos y grandes"},
  {id:3,nombre:"Hueso Dental Nylabone",descripcion:"Juguete mordedor para higiene dental canina.",categoria:"Juguetes",tipo:"Perros",precio:3500,imagen:"assets/img/productos/hueso.png",atributos:"Sabor bacon | 1 unidad | Resistente"},
  {id:4,nombre:"Shampoo Micelar Mascotas Aloe",descripcion:"Shampoo para higiene de mascotas con aloe.",categoria:"Higiene",tipo:"Perros",precio:4200,imagen:"assets/img/productos/shampoo_canino.png",atributos:"750 ml | Aloe | Uso cosmético"},
  {id:5,nombre:"Collar Ruffwear Azul",descripcion:"Collar ajustable para perro en talla L.",categoria:"Accesorios",tipo:"Perros",precio:7800,imagen:"assets/img/productos/collar.png",atributos:"Talla L | Azul | Ajustable"},
  {id:6,nombre:"Cama Ovalada para Mascota",descripcion:"Cama acolchada ovalada para perros o gatos.",categoria:"Accesorios",tipo:"Perros",precio:18500,imagen:"assets/img/productos/cama.png",atributos:"Ovalada | 1 unidad | Acolchada"},
  {id:7,nombre:"Jerky Sticks Beef Lung",descripcion:"Premios tipo jerky sticks para perros.",categoria:"Salud",tipo:"Perros",precio:3900,imagen:"assets/img/productos/snacks.png",atributos:"232 g | Beef lung | Premios"},
  {id:8,nombre:"Juguete Popet Ratones",descripcion:"Juguete para gato con catnip.",categoria:"Juguetes",tipo:"Gatos",precio:2500,imagen:"assets/img/productos/raton.png",atributos:"3 unidades | Catnip | Felino"},
  {id:9,nombre:"Arena Cat Litter Aroma Manzana 5kg",descripcion:"Arena para gatos super aglomerante con control de olores.",categoria:"Higiene",tipo:"Gatos",precio:6900,imagen:"assets/img/productos/arena.png",atributos:"5 kg | Aroma manzana | Aglomerante"},
  {id:10,nombre:"Arnés Ajustable Negro",descripcion:"Arnés cómodo y resistente para paseo de mascotas.",categoria:"Accesorios",tipo:"Perros",precio:8500,imagen:"assets/img/productos/arnes.png",atributos:"1 unidad | Ajustable | Negro"},
  {id:11,nombre:"Cat Chow Adultos Pescado 1.5kg",descripcion:"Alimento para gatos adultos sabor pescado.",categoria:"Alimento",tipo:"Gatos",precio:7200,imagen:"assets/img/productos/catchow.png",atributos:"1.5 kg | Adultos | Pescado"},
  {id:12,nombre:"Dispensador de Agua Lena 2L",descripcion:"Fuente y dispensador de agua para perros y gatos.",categoria:"Accesorios",tipo:"Gatos",precio:14500,imagen:"assets/img/productos/fuente.png",atributos:"2 litros | Dispensador | Automático"},
  {id:13,nombre:"Rascador para Gato",descripcion:"Rascador vertical con juguete colgante.",categoria:"Juguetes",tipo:"Gatos",precio:11900,imagen:"assets/img/productos/rascador.png",atributos:"1 unidad | Vertical | Felino"},
  {id:14,nombre:"Waldo Cat Pillows Salmón",descripcion:"Snack para gato relleno sabor salmón.",categoria:"Salud",tipo:"Gatos",precio:2800,imagen:"assets/img/productos/snaks_gato.png",atributos:"110 g | Salmón | Snack"},
  {id:15,nombre:"Transportadora para Mascotas",descripcion:"Transportadora resistente para viajes y veterinaria.",categoria:"Accesorios",tipo:"Gatos",precio:22500,imagen:"assets/img/productos/transportadora.png",atributos:"11-14 kg | Plástico | Reforzada"},
  {id:16,nombre:"Whiskas Adulto Carne 500g",descripcion:"Alimento para gato adulto sabor carne.",categoria:"Alimento",tipo:"Gatos",precio:3200,imagen:"assets/img/productos/whiskas1kg.png",atributos:"500 g | Carne | Adulto"},{id:17,nombre:"Bebedero Living World 125ml",descripcion:"Bebedero para aves pequeñas, útil para agua o semillas.",categoria:"Accesorios",tipo:"Aves",precio:2600,imagen:"assets/img/productos/bebedero.png",atributos:"125 ml | Aves pequeñas | Plástico"},
  {id:18,nombre:"Columpio Colorido para Aves",descripcion:"Columpio con cadenas y piezas de colores para entretenimiento de aves.",categoria:"Juguetes",tipo:"Aves",precio:2200,imagen:"assets/img/productos/columpio.png",atributos:"1 unidad | Madera | Colores variados"},
  {id:19,nombre:"Jaula Roja para Aves",descripcion:"Jaula metálica para aves pequeñas con comederos y percha.",categoria:"Accesorios",tipo:"Aves",precio:28000,imagen:"assets/img/productos/jaula.jpg",atributos:"Metálica | Incluye accesorios | Tamaño mediano"},
  {id:20,nombre:"Semillas Kiki Canario 400g",descripcion:"Mezcla de semillas vita para canario.",categoria:"Alimento",tipo:"Aves",precio:4500,imagen:"assets/img/productos/semillas.png",atributos:"400 g | Canario | Mezcla de semillas"},
  {id:21,nombre:"Vitaminas Calfomin para Aves",descripcion:"Suplemento vitamínico para aves de compañía.",categoria:"Salud",tipo:"Aves",precio:3800,imagen:"assets/img/productos/vitaminas_aves.png",atributos:"30 ml | Suplemento | Uso en aves"},{id:22,nombre:"Planta Decorativa Azul para Acuario",descripcion:"Decoración tipo coral/planta artificial para peceras.",categoria:"Accesorios",tipo:"Peces",precio:4800,imagen:"assets/img/productos/coral.png",atributos:"Decoración | Azul | Base incluida"},
  {id:23,nombre:"Nutrafin Basix Hojuelas 12g",descripcion:"Alimento en hojuelas para peces tropicales.",categoria:"Alimento",tipo:"Peces",precio:2800,imagen:"assets/img/productos/escamas.png",atributos:"12 g | Peces tropicales | Hojuelas"},
  {id:24,nombre:"Filtro Aire Aqueon QuietFlow 10",descripcion:"Bomba de aire silenciosa para acuarios pequeños.",categoria:"Salud",tipo:"Peces",precio:9500,imagen:"assets/img/productos/filtro.png",atributos:"Hasta 10 galones | Silencioso | Bajo consumo"},
  {id:25,nombre:"Luz LED para Acuario",descripcion:"Iluminación LED para mejorar la visibilidad del acuario.",categoria:"Accesorios",tipo:"Peces",precio:12500,imagen:"assets/img/productos/luz_led.png",atributos:"LED azul/blanco | Para pecera | Bajo consumo"},
  {id:26,nombre:"Pecera Rectangular 20L",descripcion:"Pecera rectangular con tapa para peces pequeños.",categoria:"Accesorios",tipo:"Peces",precio:32000,imagen:"assets/img/productos/pecera.png",atributos:"20 litros | Rectangular | Vidrio"},{id:27,nombre:"Viruta Kaytee Clean & Cozy",descripcion:"Viruta absorbente con control de olor para roedores y conejos.",categoria:"Higiene",tipo:"Pequeñas especies",precio:6900,imagen:"assets/img/productos/viruta.png",atributos:"1 unidad | Control de olor | Absorbente"},
  {id:28,nombre:"Rueda Azul para Hámster",descripcion:"Rueda de ejercicio silenciosa para hámster y pequeños roedores.",categoria:"Juguetes",tipo:"Pequeñas especies",precio:5400,imagen:"assets/img/productos/wheel.jpg",atributos:"Azul | Silenciosa | Ejercicio"},
  {id:29,nombre:"Bebedero para Roedores",descripcion:"Bebedero automático para conejos, cuyos y hurones.",categoria:"Accesorios",tipo:"Pequeñas especies",precio:4800,imagen:"assets/img/productos/bebedero_roedor.jpg",atributos:"Automático | Azul | Fácil instalación"},
  {id:30,nombre:"Rabbit Plus Conejo Mix 2kg",descripcion:"Alimento balanceado para conejos domésticos.",categoria:"Alimento",tipo:"Pequeñas especies",precio:7600,imagen:"assets/img/productos/conejo.png",atributos:"2 kg | Conejos | Balanceado"},
  {id:31,nombre:"Jaula Deluxe para Hámster",descripcion:"Jaula completa para hámster con rueda y accesorios.",categoria:"Accesorios",tipo:"Pequeñas especies",precio:36500,imagen:"assets/img/productos/jaula_hamster.jpg",atributos:"Incluye rueda | Bebedero | Casa"},
  {id:32,nombre:"Snack Curly Puffs Zanahoria",descripcion:"Snack para conejos y pequeños roedores sabor zanahoria.",categoria:"Salud",tipo:"Pequeñas especies",precio:3500,imagen:"assets/img/productos/snack_zanahoria.jpg",atributos:"9 piezas | Zanahoria | Premio"}
];

const money = (value) => "₡" + Number(value || 0).toLocaleString("es-CR");

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/\s+/g, "-")
    .replace(/_/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}


function normalizeCart(rawCart) {
  const normalized = {};

  if (!rawCart || typeof rawCart !== "object") return normalized;

  Object.entries(rawCart).forEach(([id, value]) => {
    let qty = 0;

    if (typeof value === "number") {
      qty = value;
    } else if (typeof value === "string") {
      qty = Number(value);
    } else if (value && typeof value === "object") {
      qty = Number(value.qty ?? value.quantity ?? value.cantidad ?? 0);
    }

    qty = Math.max(0, Math.floor(qty));

    if (qty > 0 && getProduct(id)) {
      normalized[id] = qty;
    }
  });

  return normalized;
}

function getCart() {
  try {
    return normalizeCart(JSON.parse(localStorage.getItem("petshop_cart") || "{}"));
  } catch {
    return {};
  }
}

function setCart(cart) {
  localStorage.setItem("petshop_cart", JSON.stringify(normalizeCart(cart)));
  updateCartCount();
}

function getProduct(id) {
  return PRODUCTS.find(product => product.id === Number(id));
}

function updateCartCount() {
  const totalItems = Object.values(getCart()).reduce((sum, qty) => sum + Number(qty), 0);
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = totalItems;
  });
}

function addToCart(id) {
  const cart = getCart();
  cart[id] = (cart[id] || 0) + 1;
  setCart(cart);
  showToast("Producto agregado correctamente.");
}

function changeQty(id, delta) {
  const cart = getCart();
  const currentQty = Number(cart[id] || 0);
  const newQty = currentQty + Number(delta);

  if (newQty <= 0) {
    delete cart[id];
  } else {
    cart[id] = newQty;
  }

  setCart(cart);
  renderCart();
}

function removeItem(id) {
  if (!confirm("¿Está seguro de eliminar este producto del carrito?")) return;

  const cart = getCart();
  delete cart[id];
  setCart(cart);
  renderCart();
}

function getCartEntries() {
  const cart = getCart();

  return Object.entries(cart)
    .map(([id, qty]) => ({
      product: getProduct(id),
      qty: Number(qty)
    }))
    .filter(item => item.product && item.qty > 0);
}

function productCard(product) {
  return `
    <div class="col-sm-6 col-lg-4 col-xl-3">
      <article class="card product-card h-100 shadow-sm">
        <img src="${product.imagen}" alt="${product.nombre}" class="card-img-top product-img">
        <div class="card-body d-flex flex-column">
          <span class="badge badge-soft align-self-start mb-2">${product.tipo} · ${product.categoria}</span>
          <h5 class="card-title">${product.nombre}</h5>
          <p class="small text-muted flex-grow-1">${product.descripcion}</p>
          <p class="price mb-1">${money(product.precio)}</p>
          <p class="small mb-3">${product.atributos}</p>

          <div class="d-grid gap-2 mt-auto">
            <a class="btn btn-outline-primary" href="detalle.html?id=${product.id}">Ver detalle</a>
            <button class="btn btn-primary" type="button" onclick="addToCart(${product.id})">Agregar al carrito</button>
          </div>
        </div>
      </article>
    </div>
  `;
}

function renderProducts(targetId, products = PRODUCTS) {
  const container = document.getElementById(targetId);
  if (!container) return;

  container.innerHTML = products.length
    ? products.map(productCard).join("")
    : `<div class="col-12"><div class="alert alert-pet">No se encontraron productos para esta búsqueda.</div></div>`;
}





function syncSearchFilters({ query, tipo, categoriaProducto, precioMax }) {
  const qInput = document.getElementById("q");
  const tipoSelect = document.getElementById("tipo");
  const categoriaSelect = document.getElementById("categoria");
  const precioSelect = document.getElementById("precioMax");

  if (qInput) qInput.value = query || "";
  if (tipoSelect) tipoSelect.value = tipo || "";
  if (categoriaSelect) categoriaSelect.value = categoriaProducto || "";
  if (precioSelect) precioSelect.value = precioMax ? String(precioMax) : "";
}

function renderProductsPage() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const params = new URLSearchParams(location.search);
  const categoria = params.get("categoria");
  const tipo = params.get("tipo");
  const categoriaProducto = params.get("categoriaProducto");
  const precioMax = Number(params.get("precioMax") || 0);
  const query = (params.get("q") || "").toLowerCase().trim();
  const page = Math.max(1, Number(params.get("page") || 1));
  const perPage = 8;

  let products = [...PRODUCTS];

  if (categoria) {
    products = products.filter(product => slugify(product.tipo) === slugify(categoria));
  }

  if (tipo) {
    products = products.filter(product => slugify(product.tipo) === slugify(tipo));
  }

  if (categoriaProducto) {
    products = products.filter(product => slugify(product.categoria) === slugify(categoriaProducto));
  }

  if (precioMax > 0) {
    products = products.filter(product => Number(product.precio) <= precioMax);
  }

  if (query) {
    products = products.filter(product =>
      `${product.nombre} ${product.descripcion} ${product.categoria} ${product.tipo} ${product.atributos}`
        .toLowerCase()
        .includes(query)
    );
  }

  const totalPages = Math.max(1, Math.ceil(products.length / perPage));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * perPage;
  const visibleProducts = products.slice(start, start + perPage);

  const title = document.getElementById("pageTitle");
  if (title) {
    if (query || tipo || categoriaProducto || precioMax) {
      title.textContent = "Resultados de búsqueda";
    } else if (categoria) {
      title.textContent = `Productos para ${products[0]?.tipo || categoria.replaceAll("-", " ")}`;
    } else {
      title.textContent = "Catálogo de productos";
    }
  }

  const count = document.getElementById("resultCount");
  if (count) {
    count.textContent = `${products.length} producto${products.length === 1 ? "" : "s"}`;
  }

  syncSearchFilters({ query, tipo, categoriaProducto, precioMax });

  renderProducts("productsGrid", visibleProducts);
  renderPagination(totalPages, safePage, categoria, query, tipo, categoriaProducto, precioMax);
}



function renderPagination(totalPages, currentPage, categoria, query, tipo, categoriaProducto, precioMax) {
  const container = document.getElementById("paginationContainer");
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }

  const isSearchPage = location.pathname.includes("busqueda");
  const basePage = isSearchPage ? "busqueda.html" : "productos.html";

  const buildUrl = (page) => {
    const params = new URLSearchParams();

    if (categoria) params.set("categoria", categoria);
    if (query) params.set("q", query);
    if (tipo) params.set("tipo", tipo);
    if (categoriaProducto) params.set("categoriaProducto", categoriaProducto);
    if (precioMax) params.set("precioMax", precioMax);

    params.set("page", page);

    return `${basePage}?${params.toString()}`;
  };

  let items = "";

  for (let i = 1; i <= totalPages; i++) {
    items += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <a class="page-link" href="${buildUrl(i)}">${i}</a>
      </li>
    `;
  }

  container.innerHTML = `
    <nav aria-label="Paginación de productos">
      <ul class="pagination pagination-sm justify-content-center mb-0">
        ${items}
      </ul>
    </nav>
  `;
}




function renderDetail() {
  const container = document.getElementById("detailContent");
  if (!container) return;

  const id = new URLSearchParams(location.search).get("id") || 1;
  const product = getProduct(id) || PRODUCTS[0];

  container.innerHTML = `
    <div class="row g-4 align-items-center">
      <div class="col-lg-5">
        <img src="${product.imagen}" class="img-fluid rounded-4 border p-3" alt="${product.nombre}">
      </div>

      <div class="col-lg-7">
        <span class="badge badge-soft mb-2">${product.tipo} · ${product.categoria}</span>
        <h1 class="fw-bold">${product.nombre}</h1>
        <p class="lead text-muted">${product.descripcion}</p>
        <p class="price fs-2">${money(product.precio)}</p>
        <p><strong>Atributos:</strong> ${product.atributos}</p>

        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-primary btn-lg" onclick="addToCart(${product.id})">Agregar al carrito</button>
          <a class="btn btn-outline-primary btn-lg" href="productos.html">Volver al catálogo</a>
        </div>
      </div>
    </div>
  `;

  let related = PRODUCTS.filter(item => item.tipo === product.tipo && item.id !== product.id);

  if (related.length < 4) {
    const extras = PRODUCTS
      .filter(item => item.tipo !== product.tipo && item.id !== product.id)
      .slice(0, 4 - related.length);

    related = [...related, ...extras];
  }

  renderProducts("relatedGrid", related.slice(0, 4));
}

function renderCart() {
  const container = document.getElementById("cartItems");
  if (!container) return;

  const entries = getCartEntries();

  const summaryWrapper = document.getElementById("cartSummaryWrapper");
  if (summaryWrapper) {
    summaryWrapper.classList.toggle("d-none", !entries.length);
  }

  if (!entries.length) {
    container.innerHTML = `
      <div class="alert alert-pet p-4">
        <h4 class="fw-bold">Su carrito está vacío</h4>
        <p class="mb-3">Agregue productos para iniciar la compra.</p>
        <a href="productos.html" class="btn btn-primary">Ver catálogo</a>
      </div>
    `;
  } else {
    container.innerHTML = entries.map(({ product, qty }) => `
      <div class="cart-item p-3 mb-3">
        <div class="row align-items-center g-3">

          <div class="col-12 col-md-3 col-lg-2">
            <div class="cart-product-img-wrap">
              <img src="${product.imagen}" alt="${product.nombre}" class="cart-img">
            </div>
          </div>

          <div class="col-12 col-md-5 col-lg-4">
            <h5 class="fw-bold cart-title">${product.nombre}</h5>
            <span class="badge badge-soft mb-2">${product.tipo} · ${product.categoria}</span>
            <p class="small text-muted cart-description">${product.descripcion}</p>
            <p class="price mb-0">${money(product.precio)}</p>
          </div>

          <div class="col-12 col-md-4 col-lg-3 cart-actions">
            <small class="fw-semibold d-block mb-2">Cantidad</small>
            <div class="d-inline-flex">
              <button class="btn btn-outline-secondary qty-btn" onclick="changeQty(${product.id}, -1)" aria-label="Disminuir cantidad">−</button>
              <span class="qty-value">${qty}</span>
              <button class="btn btn-outline-secondary qty-btn" onclick="changeQty(${product.id}, 1)" aria-label="Aumentar cantidad">+</button>
            </div>
          </div>

          <div class="col-12 col-md-8 col-lg-2 cart-total-block">
            <small class="fw-semibold d-block mb-1">Precio total</small>
            <p class="price cart-total-price mb-0">${money(product.precio * qty)}</p>
          </div>

          <div class="col-12 col-md-4 col-lg-1 text-md-end">
            <button class="delete-btn" onclick="removeItem(${product.id})">Eliminar</button>
          </div>

        </div>
      </div>
    `).join("");
  }

  renderSummary("cartSummary");
  renderSummary("checkoutSummary");
}



function renderSummary(targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;

  const entries = getCartEntries();
  const subtotal = entries.reduce((sum, { product, qty }) => sum + (Number(product.precio) * Number(qty)), 0);
  const tax = Math.round(subtotal * 0.13);
  const shipping = subtotal >= 25000 || subtotal === 0 ? 0 : 1500;
  const total = subtotal + tax + shipping;

  if (!entries.length) {
    container.innerHTML = "";
    const summaryCard = container.closest(".summary-card");
    if (summaryCard) summaryCard.classList.add("d-none");
    return;
  }

  const summaryCard = container.closest(".summary-card");
  if (summaryCard) summaryCard.classList.remove("d-none");

  const productRows = entries.map(({ product, qty }) => {
    const lineTotal = Number(product.precio) * Number(qty);

    return `
      <div class="summary-product">
        <div>
          <div class="summary-product-name">${product.nombre}</div>
          <div class="summary-product-meta">Cantidad: ${qty} · Unitario: ${money(product.precio)}</div>
        </div>
        <div class="summary-product-total">${money(lineTotal)}</div>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <div class="checkout-summary-list">
      <h6 class="fw-bold mb-3">Productos agregados</h6>
      ${productRows}
    </div>

    <div class="summary-totals pt-3">
      <div class="summary-line"><span>Subtotal</span><strong>${money(subtotal)}</strong></div>
      <div class="summary-line"><span>Impuesto (13%)</span><strong>${money(tax)}</strong></div>
      <div class="summary-line"><span>Envío</span><strong>${money(shipping)}</strong></div>
      <hr>
      <div class="summary-line fs-5"><strong>Total</strong><strong class="text-primary">${money(total)}</strong></div>
    </div>
  `;
}




function handleCheckoutSubmit(event) {
  event.preventDefault();

  const form = event.target;

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    showToast("Revise los campos marcados antes de continuar.");
    return;
  }

  form.classList.add("was-validated");
  confirmCheckout();
}

function confirmCheckout() {
  if (!getCartEntries().length) {
    alert("Debe agregar productos al carrito antes de comprar.");
    return;
  }

  const modal = new bootstrap.Modal(document.getElementById("confirmPurchaseModal"));
  modal.show();
}

function finishPurchase() {
  localStorage.removeItem("petshop_cart");
  location.href = "confirmacion.html";
}

function confirmCancel() {
  if (confirm("¿Está seguro de cancelar la compra? Se conservará el carrito, pero saldrá del formulario.")) {
    location.href = "carrito.html";
  }
}

function showToast(message) {
  const toast = document.getElementById("liveToast");
  const toastMessage = document.getElementById("toastMessage");

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  bootstrap.Toast.getOrCreateInstance(toast).show();
}

document.addEventListener("DOMContentLoaded", () => {
  setCart(getCart()); // Limpia estructuras antiguas guardadas en localStorage
  updateCartCount();
  renderProducts("featuredGrid", PRODUCTS.slice(0, 4));
  renderProductsPage();
  renderDetail();
  renderCart();
  renderSummary("checkoutSummary");
  renderSummary("cartSummary");
});
