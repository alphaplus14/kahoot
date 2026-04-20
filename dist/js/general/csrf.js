// Helpers para enviar requests POST con token CSRF.
// Orden: window.__CSRF_TOKEN__ (inyectado por PHP), <meta name="csrf-token">, #csrf-token-field.

function getCsrfToken() {
    const hidden = document.getElementById('csrf-token-field');
    if (hidden && hidden.value) {
        return hidden.value.trim();
    }
    if (typeof window.__CSRF_TOKEN__ === 'string' && window.__CSRF_TOKEN__.length > 0) {
        return window.__CSRF_TOKEN__.trim();
    }
    const meta = document.querySelector('meta[name="csrf-token"]');
    const fromMeta = meta ? meta.getAttribute('content') || '' : '';
    if (fromMeta.length > 0) {
        return fromMeta.trim();
    }
    return '';
}

/**
 * Hace un fetch añadiendo el token CSRF.
 * - Si `options.body` es FormData, añade `_csrf` al FormData.
 * - Siempre añade el header `X-CSRF-Token`.
 */
async function csrfFetch(url, options = {}) {
    const headers = new Headers(options.headers || {});
    const token = getCsrfToken();
    if (token) headers.set('X-CSRF-Token', token);

    let body = options.body;
    if (body instanceof FormData && token && !body.has('_csrf')) {
        body.append('_csrf', token);
    }

    const { headers: _h, body: _b, credentials: _cred, ...rest } = options;
    return fetch(url, {
        ...rest,
        credentials: options.credentials ?? 'same-origin',
        headers,
        body,
    });
}

window.getCsrfToken = getCsrfToken;
window.csrfFetch = csrfFetch;
