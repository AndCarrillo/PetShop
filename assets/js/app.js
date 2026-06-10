/**
 * app.js - Punto de entrada de Huellita PetShop.
 * Inicializa módulos generales sin concentrar la lógica de negocio.
 */
document.addEventListener("DOMContentLoaded", () => {
  ensureStandardAlertUi();
  setCart(getCart());
  updateCartCount();
  updateActiveNav();
  setupCheckoutDraftPersistence();
  setupPaymentConditionalFields();
  setupDeliveryConditionalFields();
  setupInlineValidation();
  setupCheckoutPaymentFields();
  setupCheckout();
  setupProductFilters();
  setupSearchFiltersSubmit();
  renderProducts("featuredGrid", PRODUCTS.slice(0, 4));
  renderProducts("newProductsGrid", PRODUCTS.slice(-2).reverse());
  renderProductsPage();
  renderDetail();
  renderCart();
  if (!byId("cartItems")) renderSummary("checkoutSummary");
  setupResponsiveCarousels();
  setupMobileMenuPropagation();
});
