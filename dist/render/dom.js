export function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
export function qs(selector) {
    const el = document.querySelector(selector);
    if (!el)
        throw new Error(`Missing element: ${selector}`);
    return el;
}
