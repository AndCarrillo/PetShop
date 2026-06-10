const CHECKOUT_CONFIG = window.APP_CONFIG?.CHECKOUT || {};
const FREE_SHIPPING_LIMIT = Number(CHECKOUT_CONFIG.freeShippingLimit || 25000);
const STANDARD_SHIPPING_COST = Number(CHECKOUT_CONFIG.standardShippingCost || 1500);
const TAX_RATE = Number(CHECKOUT_CONFIG.taxRate || 0.13);
const CHECKOUT_DRAFT_KEY = "petshopCheckoutDraft";

/**
 * Obtiene el método de entrega seleccionado.
 */
function getSelectedDelivery() {
  return qs('input[name="delivery"]:checked')?.value || "home";
}

/**
 * Obtiene el método de pago seleccionado.
 */
function getSelectedPayment() {
  return qs('input[name="payment"]:checked')?.value || "card";
}

/**
 * Devuelve el estado mostrado según el método de pago.
 */
function getPaymentStatusLabel(payment = getSelectedPayment()) {
  if (payment === "sinpe") return "Pendiente de verificación";
  if (payment === "cash") return "Pago en tienda";
  return "Pago con tarjeta";
}

/**
 * Calcula subtotal, impuesto, envío y total del pedido.
 */
function getOrderTotals(entries = getCartEntries(), delivery = getSelectedDelivery()) {
  const subtotal = entries.reduce((sum, { product, qty }) => sum + Number(product.precio) * Number(qty), 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const promotionBase = subtotal + tax;
  const isPickup = delivery === "pickup";
  const freeShippingApplied = !isPickup && promotionBase >= FREE_SHIPPING_LIMIT && subtotal > 0;
  const shipping = isPickup || freeShippingApplied || subtotal === 0 ? 0 : STANDARD_SHIPPING_COST;
  return { subtotal, tax, promotionBase, shipping, total: subtotal + tax + shipping, freeShippingApplied, isPickup };
}

/**
 * Renderiza el resumen del pedido en carrito o checkout.
 */
function renderSummary(targetId) {
  const container = byId(targetId);
  if (!container) return;
  const entries = getCartEntries();
  const summaryCard = container.closest(".summary-card");
  summaryCard?.classList.toggle("d-none", !entries.length);
  if (!entries.length) {
    container.innerHTML = "";
    return;
  }
  const rows = entries.map(({ product, qty }) => `
    <div class="summary-product">
      <div><div class="summary-product-name">${product.nombre}</div><div class="summary-product-meta">Cantidad: ${qty} · Unitario: ${money(product.precio)}</div></div>
      <div class="summary-product-total">${money(product.precio * qty)}</div>
    </div>`).join("");
  const delivery = getSelectedDelivery();
  const payment = getSelectedPayment();
  const { subtotal, tax, shipping, total, freeShippingApplied, isPickup } = getOrderTotals(entries, delivery);
  const shippingLabel = isPickup ? "No aplica" : (freeShippingApplied ? "Gratis" : money(shipping));
  const promoLimitLabel = money(FREE_SHIPPING_LIMIT);
  const promotionMessage = freeShippingApplied
    ? `<div class="checkout-promo-status checkout-promo-status--applied"><i class="bi bi-check-circle" aria-hidden="true"></i><span>Promoción aplicada: envío gratis en compras mayores a ${promoLimitLabel}.</span></div>`
    : "";
  const deliveryMessage = "";
  const paymentMessage = byId("checkoutForm") && payment === "sinpe"
    ? `<div class="checkout-payment-status"><span>Pago por SINPE</span><strong>Pendiente de verificación</strong></div>`
    : byId("checkoutForm") && payment === "cash"
      ? `<div class="checkout-payment-status"><span>Pago en efectivo</span><strong>Pendiente al retirar el pedido en tienda</strong></div>`
      : "";
  container.innerHTML = `
    <div class="checkout-summary-list"><h6 class="fw-bold mb-3">Productos agregados</h6>${rows}</div>
    <div class="summary-totals pt-3">
      <div class="summary-line"><span>Subtotal productos</span><strong>${money(subtotal)}</strong></div>
      <div class="summary-line"><span>Impuesto (13%)</span><strong>${money(tax)}</strong></div>
      <div class="summary-line summary-line-shipping"><span>${isPickup ? "Costo de envío" : "Envío"}</span><strong>${shippingLabel}</strong></div>
      ${deliveryMessage}
      ${promotionMessage}
      ${paymentMessage}
      <hr>
      <div class="summary-line fs-5"><strong>Total</strong><strong class="text-primary">${money(total)}</strong></div>
    </div>`;
}

/**
 * Procesa el envío del formulario de checkout.
 */
function handleCheckoutSubmit(event) {
  event.preventDefault();
  const form = event.target;
  form.classList.add("was-validated");
  if (!form.checkValidity()) {
    showStandardToast("Revise el formulario", "Complete los campos marcados antes de continuar.");
    return;
  }
  confirmCheckout();
}

/**
 * Muestra una confirmación antes de finalizar la compra.
 */
function confirmCheckout() {
  if (!getCartEntries().length) {
    showStandardToast("Carrito vacío", "Debe agregar productos al carrito antes de comprar.");
    return;
  }
  const payment = getSelectedPayment();
  const message = payment === "sinpe"
    ? "El pedido quedará pendiente de verificación hasta confirmar el comprobante de SINPE Móvil."
    : payment === "cash"
      ? "El pedido quedará listo para pago en efectivo al retirar en tienda."
      : "¿Desea finalizar la compra con los productos del resumen?";
  const confirmMessage = byId("confirmPurchaseMessage");
  if (confirmMessage) confirmMessage.textContent = message;
  new bootstrap.Modal(byId("confirmPurchaseModal")).show();
}

/**
 * Finaliza la compra y redirige a la confirmación.
 */
function finishPurchase() {
  localStorage.removeItem(CART_KEY);
  localStorage.removeItem(CHECKOUT_DRAFT_KEY);
  location.href = "confirmacion.html";
}


/**
 * Guarda y restaura temporalmente los datos del checkout.
 */
function setupCheckoutDraftPersistence() {
  const form = byId("checkoutForm");
  if (!form) return;
  const fields = qsa("input, select, textarea", form).filter((field) => field.name && field.name !== "aceptaTerminos");
  const readDraft = () => {
    try { return JSON.parse(localStorage.getItem(CHECKOUT_DRAFT_KEY) || "{}"); }
    catch { return {}; }
  };
  const saveDraft = () => {
    const draft = {};
    fields.forEach((field) => {
      if (field.type === "radio") {
        if (field.checked) draft[field.name] = field.value;
        return;
      }
      if (field.type === "checkbox") {
        draft[field.name] = field.checked;
        return;
      }
      draft[field.name] = field.value;
    });
    localStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(draft));
  };
  const draft = readDraft();
  fields.forEach((field) => {
    if (!(field.name in draft)) return;
    if (field.type === "radio") field.checked = field.value === draft[field.name];
    else if (field.type === "checkbox") field.checked = Boolean(draft[field.name]);
    else field.value = draft[field.name] || "";
  });
  fields.forEach((field) => {
    field.addEventListener("input", saveDraft);
    field.addEventListener("change", saveDraft);
  });
}

/**
 * Muestra u oculta campos según el método de pago.
 */
function setupPaymentConditionalFields() {
  const paymentRadios = qsa('input[name="payment"]');
  if (!paymentRadios.length) return;
  const cardContainer = qs('.checkout-card-fields[data-payment="card"]');
  const sinpeContainer = qs('.checkout-proof-fields[data-payment="sinpe"]');
  const sinpeNote = qs('.checkout-payment-note[data-payment="sinpe"]');
  const cashNote = qs('.checkout-payment-note[data-payment="cash"]');
  const cardFields = qsa('[data-payment="card"] input');
  const sinpeFields = qsa('[data-payment="sinpe"] input');
  const cashOption = qs('[data-payment-option="cash"]');
  const cashRadio = byId("pagoEfectivo");
  const update = () => {
    const payment = getSelectedPayment();
    const isPickup = getSelectedDelivery() === "pickup";
    const isCard = payment === "card";
    const isSinpe = payment === "sinpe";
    const isCash = payment === "cash";

    if (!isPickup && isCash) byId("pagoTarjeta").checked = true;

    cashOption?.classList.toggle("d-none", !isPickup);
    if (cashRadio) cashRadio.disabled = !isPickup;

    const currentPayment = getSelectedPayment();
    cardContainer?.classList.toggle("d-none", currentPayment !== "card");
    sinpeContainer?.classList.toggle("d-none", currentPayment !== "sinpe");
    sinpeNote?.classList.toggle("d-none", currentPayment !== "sinpe");
    cashNote?.classList.toggle("d-none", currentPayment !== "cash");

    cardFields.forEach((field) => {
      field.disabled = currentPayment !== "card";
      field.required = currentPayment === "card";
      if (currentPayment !== "card") field.classList.remove("is-invalid", "is-valid");
    });
    sinpeFields.forEach((field) => {
      field.disabled = currentPayment !== "sinpe";
      field.required = currentPayment === "sinpe";
      if (currentPayment !== "sinpe") field.classList.remove("is-invalid", "is-valid");
    });
    renderSummary("checkoutSummary");
  };
  paymentRadios.forEach((radio) => radio.addEventListener("change", update));
  update();
}

/**
 * Muestra u oculta campos según el método de entrega.
 */
function setupDeliveryConditionalFields() {
  const deliveryRadios = qsa('input[name="delivery"]');
  if (!deliveryRadios.length) return;
  const homeFieldsBox = qs('.checkout-delivery-fields[data-delivery="home"]');
  const pickupNote = qs('.checkout-delivery-note[data-delivery="pickup"]');
  const deliveryFields = qsa('.checkout-delivery-fields[data-delivery="home"] input, .checkout-delivery-fields[data-delivery="home"] select, .checkout-delivery-fields[data-delivery="home"] textarea');
  const update = () => {
    const isPickup = qs('input[name="delivery"]:checked')?.value === "pickup";
    homeFieldsBox?.classList.toggle("d-none", isPickup);
    pickupNote?.classList.toggle("d-none", !isPickup);
    deliveryFields.forEach((field) => {
      field.disabled = isPickup;
      field.required = !isPickup;
      if (isPickup) field.classList.remove("is-invalid", "is-valid");
    });
    if (!isPickup && byId("pagoEfectivo")?.checked) byId("pagoTarjeta").checked = true;
    qsa('input[name="payment"]').forEach((radio) => radio.dispatchEvent(new Event("change")));
    renderSummary("checkoutSummary");
  };
  deliveryRadios.forEach((radio) => radio.addEventListener("change", update));
  update();
}

/**
 * Configura validaciones visuales básicas del formulario.
 */
function setupInlineValidation() {
  qsa(".checkout-form input, .checkout-form select, .checkout-form textarea").forEach((field) => {
    field.addEventListener("input", () => {
      field.classList.toggle("is-invalid", !field.checkValidity());
      field.classList.toggle("is-valid", field.checkValidity());
    });
  });
}

/**
 * Configura los campos de pago del checkout.
 */
function setupCheckoutPaymentFields() {
  const masks = [
    ["numeroTarjeta", (value) => value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim()],
    ["expiracionTarjeta", (value) => {
      const clean = value.replace(/\D/g, "").slice(0, 4);
      return clean.length > 2 ? `${clean.slice(0, 2)}/${clean.slice(2)}` : clean;
    }],
  ];
  masks.forEach(([id, formatter]) => byId(id)?.addEventListener("input", (event) => { event.target.value = formatter(event.target.value); }));
  const cvv = byId("cvvTarjeta");
  const toggle = qs(".cvv-toggle");
  toggle?.addEventListener("click", () => {
    const showing = cvv?.type === "text";
    if (!cvv) return;
    cvv.type = showing ? "password" : "text";
    toggle.innerHTML = `<i class="bi ${showing ? "bi-eye" : "bi-eye-slash"}" aria-hidden="true"></i>`;
    toggle.setAttribute("aria-label", showing ? "Mostrar CVV" : "Ocultar CVV");
  });
}

/**
 * Inicializa la lógica principal del checkout.
 */
function setupCheckout() {
  byId("checkoutForm")?.addEventListener("submit", handleCheckoutSubmit);
  byId("finishPurchaseBtn")?.addEventListener("click", finishPurchase);
}
