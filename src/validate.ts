import type { CandleDraft, CandleStatus } from './types.js';

const STATUSES: readonly CandleStatus[] = ['unlit', 'burning', 'finished'];

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
  if (!STATUSES.includes(draft.status)) errors.status = 'Status tidak valid.';
  return { valid: Object.keys(errors).length === 0, errors };
}
