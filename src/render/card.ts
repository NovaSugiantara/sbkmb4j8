import type { Candle } from '../types.js';
import { escapeHtml } from './dom.js';
import { renderRating } from './rating.js';

const STATUS_LABEL: Record<Candle['status'], string> = {
  unlit: 'Belum dinyalakan',
  burning: 'Menyala',
  finished: 'Habis',
};

export function renderCard(candle: Candle): string {
  const brand = candle.brand ? `<span class="card-brand">${escapeHtml(candle.brand)}</span>` : '';
  const notes = candle.notes ? `<p class="card-notes">${escapeHtml(candle.notes)}</p>` : '';
  const scent = candle.scentNotes.map(escapeHtml).join(' · ');
  return `
    <li class="card">
      <div class="card-top">
        <h3 class="card-title">${escapeHtml(candle.name)}</h3>
        <span class="badge badge-${candle.status}">${STATUS_LABEL[candle.status]}</span>
      </div>
      ${brand}
      <p class="card-scent">${scent}</p>
      ${renderRating(candle.rating)}
      ${notes}
      <div class="card-actions">
        <button class="btn btn-ghost btn-sm" type="button" data-action="edit-card" data-id="${escapeHtml(candle.id)}">Edit</button>
        <button class="btn btn-danger btn-sm" type="button" data-action="delete-card" data-id="${escapeHtml(candle.id)}">Hapus</button>
      </div>
    </li>`;
}
