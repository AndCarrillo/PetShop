/**
 * app.js - Funciones principales del proyecto Huellita PetShop.
 */
const CART_KEY = "petshop_cart";
const PER_PAGE = 8;
/**
 * Selecciona el primer elemento que coincide con el selector indicado.
 */
const qs = (selector, root = document) => root.querySelector(selector);
/**
 * Selecciona todos los elementos que coinciden con el selector indicado.
 */
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
/**
 * Obtiene un elemento del DOM por su identificador.
 */
const byId = (id) => document.getElementById(id);
/**
 * Formatea montos en colones costarricenses.
 */
const money = (value) => "₡" + Number(value || 0).toLocaleString("es-CR");
/**
 * Normaliza texto para usarlo en filtros, clases o rutas amigables.
 */
const slugify = (value) => String(value || "")
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/ñ/g, "n")
  .replace(/[\s_]+/g, "-")
  .replace(/[^a-z0-9-]/g, "")
  .replace(/-+/g, "-")
  .replace(/^-|-$/g, "");

