PetShop UNA - Proyecto 2
Versión actualizada con paleta Huellita de Alí, fondo blanco y espaciado minimalista.

Tecnologías:
- HTML5
- CSS3
- Bootstrap 5 por CDN
- JavaScript mínimo para carrito funcional, búsqueda, detalle y confirmaciones

Mejoras aplicadas:
- Uso de imágenes reales proporcionadas para productos.
- Categorías con imágenes: gato, ave, pez, perro y pequeñas especies.
- Carrito funcional con localStorage.
- Resumen de compra con productos, cantidades, precio unitario, subtotal, impuesto, envío y total.
- Formulario reforzado con labels, inputs adecuados, textos de ayuda y agrupación lógica.
- Modal de confirmación antes de comprar.
- Confirmación antes de cancelar o eliminar productos.
- Paginación visual en catálogo de productos.

Corrección V12:
- Tabla/resumen de compra reorganizado.
- Imágenes del carrito ajustadas para evitar texto sobrepuesto.
- Layout responsive corregido para móvil, tablet y escritorio.

- Se agregaron nuevos productos e imágenes reales para categoría de gatos y accesorios.
Corrección V14:
- Se corrigió localStorage antiguo que generaba [object Object].
- Se corrigieron cálculos NaN en subtotal, impuesto y total.
- Se normalizó la estructura del carrito para guardar solo cantidades numéricas por producto.

Corrección V15:
- Se agregaron productos reales de la categoría Aves con imágenes proporcionadas.
- Se actualizó catálogo CSV, detalle, listado, búsqueda y carrito funcional.

Corrección V16:
- Se corrigió la visualización del resumen de compra en checkout.
- El resumen ahora se renderiza aunque la página no tenga el contenedor del carrito.
- Se agregó layout responsive con miniaturas, cantidades, unitario y total por producto.

Corrección V17:
- Se agregaron productos reales de la categoría Peces con imágenes proporcionadas.
- Se actualizó catálogo CSV, listado, detalle, búsqueda, carrito y checkout.

Corrección V18:
- Se agregaron productos reales para Pequeñas especies.
- Catálogo ampliado a 32 productos.
- Integración completa con detalle, búsqueda, carrito y checkout.

Corrección V19:
- Se reacomodó checkout.html para móvil.
- En móvil el resumen aparece antes del formulario.
- Los campos del formulario se apilan correctamente.
- Botones finales quedan visibles y cómodos en pantallas pequeñas.

Corrección V20:
- Se simplificó el CTA del hero para evitar acciones repetidas.
- En carrito vacío se oculta el resumen y el botón de pago.
- Se cambió "Proceder al pago" por "Continuar con la compra".
- Se corrigió el filtro para Pequeñas especies usando slugify.
- Se ajustó el layout para evitar espacio blanco antes del footer.

Corrección V21:
- Se aplicaron mejoras basadas en la Sesión 9 de formularios.
- Checkout con texto introductorio, fieldset/legend, labels visibles, ayudas breves e inputs correctos.
- Resumen de checkout simplificado sin imágenes.
- Paginación simple funcional en productos.html con 8 productos por página.
- Recomendaciones en detalle priorizan productos de la misma especie.
- Hero mejorado con mensaje de oferta sin duplicar CTA.

Corrección V22:
- Se integró portada.png como imagen principal del banner inicial.
- Se aplicaron validaciones completas en checkout.html:
  required, minlength, maxlength, pattern, inputmode, autocomplete e invalid-feedback.
- Se agregó validación Bootstrap con clase was-validated.
- Se conserva estructura responsive y paleta Huellita de Alí con fondo blanco.

Corrección V23:
- Se mejoró busqueda.html con filtros simples: texto, especie, categoría y precio máximo.
- La paginación conserva los filtros aplicados.
- Se agregó contador de resultados.
- Los filtros se mantienen seleccionados después de aplicar búsqueda.
