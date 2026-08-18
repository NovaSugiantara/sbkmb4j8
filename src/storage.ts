import type { Candle } from './types.js';

const KEY = 'candle-log:v1';

export function loadCandles(): Candle[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Candle[]) : [];
  } catch {
    return [];
  }
}

export function saveCandles(candles: Candle[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(candles));
  } catch {
    // quota / privacy mode: ignore, state stays in-memory
  }
}
