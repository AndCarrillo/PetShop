/**
 * Normaliza el carrito para conservar solo productos válidos y cantidades positivas.
 */
function normalizeCart(rawCart) {
  if (!rawCart || typeof rawCart !== "object") return {};
  return Object.entries(rawCart).reduce((cart, [id, value]) => {
    const qty = Math.max(0, Math.floor(Number(
      typeof value === "object" && value ? value.qty ?? value.quantity ?? value.cantidad : value,
    ) || 0));
    if (qty > 0 && getProduct(id)) cart[id] = qty;
    return cart;
  }, {});
}

/**
 * Obtiene el carrito almacenado localmente.
 */
function getCart() {
  try { return normalizeCart(JSON.parse(localStorage.getItem(CART_KEY) || "{}")); }
  catch { return {}; }
}

/**
 * Guarda el carrito y actualiza el contador visual.
 */
function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(normalizeCart(cart)));
  updateCartCount();
}

/**
 * Convierte el carrito en una lista de productos con cantidad.
 */
function getCartEntries() {
  return Object.entries(getCart())
    .map(([id, qty]) => ({ product: getProduct(id), qty: Number(qty) }))
    .filter(({ product, qty }) => product && qty > 0);
}

/**
 * Actualiza el contador del carrito en el header.
 */
function updateCartCount() {
  const totalItems = Object.values(getCart()).reduce((sum, qty) => sum + Number(qty), 0);
  qsa(".cart-count").forEach((el) => { el.textContent = totalItems; });
}

/**
 * Agrega una unidad de producto al carrito.
 */
function addToCart(id) {
  const cart = getCart();
  cart[id] = (cart[id] || 0) + 1;
  setCart(cart);
  showStandardToast("Producto agregado", "El producto se agregó correctamente al carrito.");
}

/**
 * Aumenta o disminuye la cantidad de un producto en el carrito.
 */
function changeQty(id, delta) {
  const cart = getCart();
  const qty = Number(cart[id] || 0) + Number(delta);
  qty <= 0 ? delete cart[id] : cart[id] = qty;
  setCart(cart);
  renderCart();
}

/**
 * Solicita confirmación y elimina un producto del carrito.
 */
function removeItem(id) {
  const product = getProduct(id);
  showStandardConfirm({
    title: "Eliminar producto",
    message: `¿Está seguro de eliminar ${product ? product.nombre : "este producto"} del carrito?`,
    confirmText: "Eliminar",
    cancelText: "Cancelar",
    confirmClass: "btn-danger",
    onConfirm: () => {
      const cart = getCart();
      delete cart[id];
      setCart(cart);
      renderCart();
      showStandardToast("Producto eliminado", "El producto se eliminó del carrito.");
    },
  });
}

/**
 * Renderiza los productos agregados al carrito.
 */
function renderCart() {
  const container = byId("cartItems");
  if (!container) return;
  const entries = getCartEntries();
  byId("cartSummaryWrapper")?.classList.toggle("d-none", !entries.length);
  container.innerHTML = entries.length ? entries.map(cartItemTemplate).join("") : `
    <div class="alert alert-pet p-4"><h4 class="fw-bold">Su carrito está vacío</h4><p class="mb-3">Agregue productos para iniciar la compra.</p></div>`;
  renderSummary("cartSummary");
  renderSummary("checkoutSummary");
}

/**
 * Genera el HTML de un producto dentro del carrito.
 */
function cartItemTemplate({ product, qty }) {
  return `
    <div class="card cart-item cart-item-card border-0 shadow-sm mb-3">
      <div class="row g-0 align-items-center cart-item-row">
        <div class="col-4 col-sm-3 col-md-2 cart-media-col">
          <div class="cart-product-img-wrap">
            <img src="${product.imagen}" alt="${product.nombre}" class="cart-img">
          </div>
        </div>
        <div class="col-8 col-sm-9 col-md-5 col-lg-4 cart-item-info">
          <h5 class="cart-title fw-bold mb-1">${product.nombre}</h5>
          <p class="cart-description text-muted mb-0">${product.atributos}</p>
          <div class="cart-unit-price-block" aria-label="Precio unitario">
            <span class="cart-unit-label">Precio unitario</span>
            <span class="cart-unit-price">${money(product.precio)}</span>
          </div>
        </div>
        <div class="col-12 col-md-3 col-lg-3 cart-actions">
          <small class="fw-semibold d-block mb-2">Cantidad</small>
          <div class="cart-qty-control d-inline-flex">
            <button class="btn btn-outline-secondary qty-btn" onclick="changeQty(${product.id}, -1)" aria-label="Disminuir cantidad">−</button>
            <span class="qty-value">${qty}</span>
            <button class="btn btn-outline-secondary qty-btn" onclick="changeQty(${product.id}, 1)" aria-label="Aumentar cantidad">+</button>
          </div>
        </div>
        <div class="col-8 col-md-1 col-lg-2 cart-total-block"><small class="fw-semibold d-block mb-1">Subtotal</small><p class="price cart-total-price mb-0">${money(product.precio * qty)}</p></div>
        <div class="col-4 col-md-1 col-lg-1 text-end cart-delete-block"><button class="delete-btn" onclick="removeItem(${product.id})">Eliminar</button></div>
      </div>
    </div>`;
}
