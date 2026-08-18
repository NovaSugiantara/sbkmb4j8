import { CANDLE_STATUSES } from './types.js';
import type { CandleDraft } from './types.js';

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<'name' | 'rating' | 'status', string>>;
}

export function validateCandle(draft: CandleDraft): ValidationResult {
  const errors: ValidationResult['errors'] = {};
  if (!draft.name.trim()) errors.name = 'Nama wajib diisi.';
  if (!Number.isInteger(draft.rating) || draft.rating < 1 || draft.rating > 5) {
    errors.rating = 'Rating harus angka 1 sampai 5.';
  }
  if (!(CANDLE_STATUSES as readonly string[]).includes(draft.status)) errors.status = 'Status tidak valid.';
  return { valid: Object.keys(errors).length === 0, errors };
}
