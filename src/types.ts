export type CandleStatus = 'unlit' | 'burning' | 'finished';

export const CANDLE_STATUSES: readonly CandleStatus[] = ['unlit', 'burning', 'finished'];

export const STATUS_LABEL: Record<CandleStatus, string> = {
  unlit: 'Belum dinyalakan',
  burning: 'Menyala',
  finished: 'Habis',
};

export interface Candle {
  id: string;
  name: string;
  brand?: string;
  scentNotes: string[];
  status: CandleStatus;
  rating: number; // 1-5
  notes?: string;
  createdAt: number; // epoch ms
  updatedAt: number;
}

export interface CandleDraft {
  name: string;
  brand: string;
  scentNotes: string; // comma-separated raw input
  status: CandleStatus;
  rating: number;
  notes: string;
}
