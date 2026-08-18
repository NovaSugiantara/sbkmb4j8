import { renderCard } from './card.js';
export function renderList(candles) {
    return candles.map(renderCard).join('');
}
