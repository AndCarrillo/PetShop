/* PetShop UNA v32 - selects personalizados: solo hover, sin resaltar seleccionado */
function initPetshopFilterSelects() {
  const filterSelects = qsa(".search-panel select.form-select, .product-filter-form select.form-select, .products-filter-sidebar select.form-select");
  filterSelects.forEach((select, index) => {
    if (select.dataset.customSelectReady === "true") return;
    select.dataset.customSelectReady = "true";

    const wrapper = document.createElement("div");
    wrapper.className = "custom-select-theme";
    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "custom-select-toggle";
    button.setAttribute("aria-haspopup", "listbox");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", select.getAttribute("aria-label") || select.closest(".filter-field, [class*='col-']")?.querySelector("label")?.textContent?.trim() || "Seleccionar opción");

    const menu = document.createElement("ul");
    const menuId = `customSelectMenu${index + 1}`;
    menu.id = menuId;
    menu.className = "custom-select-menu d-none";
    menu.setAttribute("role", "listbox");
    button.setAttribute("aria-controls", menuId);

    wrapper.appendChild(button);
    wrapper.appendChild(menu);

    const close = () => {
      wrapper.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
      menu.classList.add("d-none");
      qsa(".custom-select-option", menu).forEach((item) => item.classList.remove("is-touch-hover", "is-highlighted"));
    };

    const open = () => {
      qsa(".custom-select-theme.is-open").forEach((other) => {
        if (other !== wrapper) {
          other.classList.remove("is-open");
          other.querySelector(".custom-select-toggle")?.setAttribute("aria-expanded", "false");
          other.querySelector(".custom-select-menu")?.classList.add("d-none");
        }
      });
      wrapper.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
      menu.classList.remove("d-none");
    };

    const updateButton = () => {
      const selected = select.selectedOptions[0] || select.options[0];
      button.textContent = selected ? selected.textContent : "Seleccionar";
      qsa(".custom-select-option", menu).forEach((item) => {
        const isSelected = item.dataset.value === select.value;
        item.classList.toggle("is-selected", isSelected);
        item.setAttribute("aria-selected", String(isSelected));
      });
    };

    const buildOptions = () => {
      menu.innerHTML = "";
      Array.from(select.options).forEach((option) => {
        const item = document.createElement("li");
        item.setAttribute("role", "option");
        item.className = "custom-select-option";
        item.tabIndex = 0;
        item.dataset.value = option.value;
        item.textContent = option.textContent;
        const applyResponsiveHover = () => {
          qsa(".custom-select-option", menu).forEach((optionItem) => optionItem.classList.remove("is-touch-hover"));
          item.classList.add("is-touch-hover");
        };

        item.addEventListener("pointerenter", applyResponsiveHover);
        item.addEventListener("focus", applyResponsiveHover);
        item.addEventListener("pointerdown", applyResponsiveHover);
        item.addEventListener("touchstart", applyResponsiveHover, { passive: true });
        item.addEventListener("pointerleave", () => item.classList.remove("is-touch-hover"));
        item.addEventListener("blur", () => item.classList.remove("is-touch-hover"));

        item.addEventListener("click", () => {
          select.value = option.value;
          select.dispatchEvent(new Event("change", { bubbles: true }));
          updateButton();
          close();
          button.focus();
        });
        item.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            item.click();
          }
        });
        menu.appendChild(item);
      });
      updateButton();
    };

    button.addEventListener("click", () => wrapper.classList.contains("is-open") ? close() : open());
    button.addEventListener("keydown", (event) => {
      if (["ArrowDown", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        open();
        (menu.querySelector(".is-selected") || menu.querySelector(".custom-select-option"))?.focus();
      }
      if (event.key === "Escape") close();
    });
    menu.addEventListener("keydown", (event) => {
      const items = qsa(".custom-select-option", menu);
      const current = items.indexOf(document.activeElement);
      if (event.key === "Escape") {
        close();
        button.focus();
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        items[Math.min(items.length - 1, current + 1)]?.focus();
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        items[Math.max(0, current - 1)]?.focus();
      }
    });
    select.addEventListener("change", () => {
      buildOptions();
      if (select.id === "tipo") setTimeout(initPetshopFilterSelects, 0);
    });

    buildOptions();
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".custom-select-theme")) {
      qsa(".custom-select-theme.is-open").forEach((wrapper) => {
        wrapper.classList.remove("is-open");
        wrapper.querySelector(".custom-select-toggle")?.setAttribute("aria-expanded", "false");
        wrapper.querySelector(".custom-select-menu")?.classList.add("d-none");
      });
    }
  }, { once: true });
}

/* Ejecutar después de la carga inicial y después de que app.js rellene opciones dinámicas */
document.addEventListener("DOMContentLoaded", () => setTimeout(initPetshopFilterSelects, 0));
