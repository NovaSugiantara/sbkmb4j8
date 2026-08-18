import type { Candle } from './types.js';
import { saveCandles } from './storage.js';

type Listener = (candles: Candle[], saveOk: boolean) => void;

export interface Store {
  getCandles(): Candle[];
  subscribe(fn: Listener): void;
  commit(candles: Candle[]): void;
}

export function createStore(initial: Candle[]): Store {
  let candles = initial;
  const listeners = new Set<Listener>();
  return {
    getCandles: () => candles,
    subscribe: (fn) => {
      listeners.add(fn);
    },
    commit: (next) => {
      candles = next;
      const saveOk = saveCandles(candles);
      listeners.forEach((fn) => fn(candles, saveOk));
    },
  };
}
