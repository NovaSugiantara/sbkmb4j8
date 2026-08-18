import type { Candle, CandleDraft } from './types.js';
import { createId } from './id.js';
import type { Store } from './store.js';

function toCandle(draft: CandleDraft, id: string, ts: number): Candle {
  return {
    id,
    name: draft.name.trim(),
    brand: draft.brand.trim() || undefined,
    scentNotes: draft.scentNotes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    status: draft.status,
    rating: draft.rating,
    notes: draft.notes.trim() || undefined,
    createdAt: ts,
    updatedAt: ts,
  };
}

export function addCandle(store: Store, draft: CandleDraft): Candle {
  const ts = Date.now();
  const candle = toCandle(draft, createId(), ts);
  store.commit([candle, ...store.getCandles()]);
  return candle;
}

export function updateCandle(store: Store, id: string, draft: CandleDraft): Candle | undefined {
  const ts = Date.now();
  let updated: Candle | undefined;
  const next = store.getCandles().map((c) => {
    if (c.id !== id) return c;
    updated = { ...toCandle(draft, id, ts), createdAt: c.createdAt };
    return updated;
  });
  if (!updated) return undefined; // id not found: no commit, no notify, no persist
  store.commit(next);
  return updated;
}

export function deleteCandle(store: Store, id: string): void {
  const current = store.getCandles();
  const next = current.filter((c) => c.id !== id);
  if (next.length === current.length) return; // id not found: no-op
  store.commit(next);
}
