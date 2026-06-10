/**
 * Configuracion global del sitio
 * Huellita PetShop
 *
 * Mantener aqui enlaces, contacto y valores reutilizables.
 * Evita duplicar informacion en componentes, footer, menu lateral y checkout.
 */
window.APP_CONFIG = Object.freeze({
  SITE_NAME: "Huellita PetShop",
  AUTHOR: "Andrea Carrillo",

  CONTACT: Object.freeze({
    email: "petshopuna.cr@gmail.com",
    phone: "+506 8888-8888",
    whatsappText: "Consultar por WhatsApp",
    address: "Costa Rica",
    deliveryNotice: "Envíos solo dentro de la GAM.",
    deliveryNoticeShort: "Envíos solo GAM.",
  }),

  SOCIAL: Object.freeze({
    instagram: "https://instagram.com/petshopuna",
    facebook: "https://facebook.com/petshopuna",
    tiktok: "https://tiktok.com/@petshopuna",
    whatsapp: "https://wa.me/50688888888",
  }),

  CHECKOUT: Object.freeze({
    freeShippingLimit: 25000,
    standardShippingCost: 1500,
    taxRate: 0.13,
    homeDeliveryProvinces: ["San José", "Alajuela", "Cartago", "Heredia"],
  }),
});
