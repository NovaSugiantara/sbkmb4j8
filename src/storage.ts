import type { Candle } from './types.js';

const KEY = 'candle-log:v1';
const STATUSES: readonly string[] = ['unlit', 'burning', 'finished'];

function isCandle(value: unknown): value is Candle {
  if (typeof value !== 'object' || value === null) return false;
  const c = value as Record<string, unknown>;
  return (
    typeof c.id === 'string' && c.id !== '' &&
    typeof c.name === 'string' && c.name.trim() !== '' &&
    typeof c.status === 'string' && STATUSES.includes(c.status) &&
    typeof c.rating === 'number' && Number.isInteger(c.rating) && c.rating >= 1 && c.rating <= 5 &&
    Array.isArray(c.scentNotes) &&
    typeof c.createdAt === 'number' &&
    typeof c.updatedAt === 'number'
  );
}

export function loadCandles(): Candle[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isCandle) : [];
  } catch {
    return [];
  }
}

export function saveCandles(candles: Candle[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(candles));
  } catch {
    // quota / privacy mode: data stays in-memory; console-level warning only (UI toast out of 25KB budget)
    console.warn('Candle log: gagal menyimpan ke localStorage');
  }
}
