export function renderSummary(candles) {
    const burning = candles.filter((c) => c.status === 'burning').length;
    const finished = candles.filter((c) => c.status === 'finished').length;
    const stat = (label, value) => `<span class="summary-stat"><strong class="summary-value">${value}</strong><span class="summary-label">${label}</span></span>`;
    return `${stat('Total', candles.length)}${stat('Menyala', burning)}${stat('Habis', finished)}`;
}
