import { CANDLE_STATUSES, STATUS_LABEL } from '../types.js';
import type { Candle, CandleDraft, CandleStatus } from '../types.js';
import { escapeHtml } from './dom.js';
import { renderRatingInput } from './rating.js';

export function renderForm(draft?: CandleDraft): string {
  const d = draft;
  const value = (k: keyof CandleDraft) => (d ? escapeHtml(String(d[k])) : '');
  const options = CANDLE_STATUSES.map(
    (s) => `<option value="${s}"${d && d.status === s ? ' selected' : ''}>${STATUS_LABEL[s]}</option>`
  ).join('');
  return `
    <form id="candle-form" novalidate>
  <div class="field">
    <label class="field-label" for="name">Nama</label>
    <input class="input" id="name" name="name" type="text" required maxlength="80" aria-describedby="form-errors" placeholder="Contoh: Amber Noir" value="${value('name')}" />
  </div>
  <div class="field">
    <label class="field-label" for="brand">Brand</label>
    <input class="input" id="brand" name="brand" type="text" maxlength="60" placeholder="Contoh: Maison Lune" value="${value('brand')}" />
  </div>
  <div class="field">
    <label class="field-label" for="scentNotes">Aroma</label>
    <input class="input" id="scentNotes" name="scentNotes" type="text" placeholder="Pisahkan dengan koma, contoh: amber, vanilla" value="${value('scentNotes')}" />
  </div>
  <div class="field">
    <label class="field-label" for="status">Status</label>
    <select class="input" id="status" name="status" aria-describedby="form-errors">${options}</select>
  </div>
  ${renderRatingInput(d?.rating)}
  <div class="field">
    <label class="field-label" for="notes">Catatan</label>
    <textarea class="input" id="notes" name="notes" rows="3" placeholder="Contoh: tunneled, wangi vanilla">${value('notes')}</textarea>
  </div>
  <p class="form-errors" id="form-errors" role="alert" hidden></p>
  <div class="form-actions">
    <button class="btn btn-primary" type="submit">Simpan</button>
    <button class="btn btn-ghost" type="button" data-action="close-form">Batal</button>
  </div>
    </form>`;
}

export function collectDraft(form: HTMLFormElement): CandleDraft {
  const fd = new FormData(form);
  return {
    name: String(fd.get('name') ?? ''),
    brand: String(fd.get('brand') ?? ''),
    scentNotes: String(fd.get('scentNotes') ?? ''),
    status: String(fd.get('status') ?? '') as CandleStatus,
    rating: Number(fd.get('rating') ?? 0),
    notes: String(fd.get('notes') ?? ''),
  };
}

export function draftFromCandle(candle: Candle): CandleDraft {
  return {
    name: candle.name,
    brand: candle.brand ?? '',
    scentNotes: candle.scentNotes.join(', '),
    status: candle.status,
    rating: candle.rating,
    notes: candle.notes ?? '',
  };
}
