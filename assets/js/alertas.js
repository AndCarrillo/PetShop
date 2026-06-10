/**
 * Crea los contenedores reutilizables de alertas y confirmaciones.
 */
function ensureStandardAlertUi() {
  if (!byId("standardConfirmModal")) document.body.insertAdjacentHTML("beforeend", `
    <div class="modal fade pet-alert-modal" id="standardConfirmModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title" id="standardConfirmTitle">Confirmar acción</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div>
        <div class="modal-body" id="standardConfirmMessage">¿Desea continuar?</div>
        <div class="modal-footer"><button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal" id="standardConfirmCancel">Cancelar</button><button type="button" class="btn btn-primary" id="standardConfirmAccept">Aceptar</button></div>
      </div></div>
    </div>`);
  if (!byId("standardToast")) document.body.insertAdjacentHTML("beforeend", `
    <div class="toast-container position-fixed top-0 end-0 p-3 pet-toast-container">
      <div id="standardToast" class="toast pet-standard-toast" role="status" aria-live="polite" aria-atomic="true">
        <div class="toast-header"><i class="bi bi-check-circle-fill me-2" aria-hidden="true"></i><strong class="me-auto" id="standardToastTitle">Mensaje</strong><button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Cerrar"></button></div>
        <div class="toast-body" id="standardToastMessage">Acción realizada.</div>
      </div>
    </div>`);
}

/**
 * Muestra una notificación breve al usuario.
 */
function showStandardToast(title, message) {
  ensureStandardAlertUi();
  byId("standardToastTitle").textContent = title;
  byId("standardToastMessage").textContent = message;
  bootstrap.Toast.getOrCreateInstance(byId("standardToast"), { delay: 2600 }).show();
}

/**
 * Muestra un cuadro de confirmación reutilizable.
 */
function showStandardConfirm({ title, message, confirmText = "Aceptar", cancelText = "Cancelar", confirmClass = "btn-primary", onConfirm }) {
  ensureStandardAlertUi();
  const modalEl = byId("standardConfirmModal");
  const acceptBtn = byId("standardConfirmAccept");
  const freshAccept = acceptBtn.cloneNode(true);
  byId("standardConfirmTitle").textContent = title;
  byId("standardConfirmMessage").textContent = message;
  byId("standardConfirmCancel").textContent = cancelText;
  acceptBtn.textContent = confirmText;
  acceptBtn.className = `btn ${confirmClass}`;
  acceptBtn.replaceWith(freshAccept);
  freshAccept.textContent = confirmText;
  freshAccept.className = `btn ${confirmClass}`;
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  freshAccept.addEventListener("click", () => {
    modal.hide();
    if (typeof onConfirm === "function") onConfirm();
  }, { once: true });
  modal.show();
}
