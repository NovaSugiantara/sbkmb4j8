import type { Candle } from '../types.js';
import { renderCard } from './card.js';

export function renderList(candles: Candle[]): string {
  return candles.map(renderCard).join('');
}
