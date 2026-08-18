export type CandleStatus = 'unlit' | 'burning' | 'finished';

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
