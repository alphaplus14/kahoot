'use strict';

/**
 * SweetAlert2: Enter en inputs/select dispara Confirmar (equivalente al clic).
 * No aplica en textarea (nueva línea) ni en la barra de botones del modal.
 */
export function swalBindEnterConfirm(popup) {
    if (!popup) return;
    popup.addEventListener(
        'keydown',
        (e) => {
            if (e.key !== 'Enter' || e.isComposing) return;
            const t = e.target;
            if (!t || !(t instanceof Element)) return;
            if (t.closest('.swal2-actions')) return;
            if (t.tagName === 'TEXTAREA') return;
            if (t instanceof HTMLElement && t.isContentEditable) return;
            e.preventDefault();
            const btn = popup.querySelector('.swal2-confirm:not([disabled])');
            btn?.click();
        },
        true,
    );
}
