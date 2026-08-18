import { STATUS_LABEL } from '../types.js';
import type { Candle } from '../types.js';
import { escapeHtml } from './dom.js';
import { renderRating } from './rating.js';

export function renderCard(candle: Candle): string {
  const status = candle.status in STATUS_LABEL ? candle.status : 'unlit';
  const brand = candle.brand ? `<span class="card-brand">${escapeHtml(candle.brand)}</span>` : '';
  const notes = candle.notes ? `<p class="card-notes">${escapeHtml(candle.notes)}</p>` : '';
  const scent = candle.scentNotes.map(escapeHtml).join(' · ');
  const scentBlock = scent ? `<p class="card-scent">${scent}</p>` : '';
  return `
<li class="card">
<div class="card-top">
<h3 class="card-title">${escapeHtml(candle.name)}</h3>
<span class="badge badge-${status}">${STATUS_LABEL[status]}</span>
</div>
${brand}
${scentBlock}
${renderRating(candle.rating)}
${notes}
<div class="card-actions">
<button class="btn btn-ghost btn-sm" type="button" data-action="edit-card" data-id="${escapeHtml(candle.id)}">Edit</button>
<button class="btn btn-danger btn-sm" type="button" data-action="delete-card" data-id="${escapeHtml(candle.id)}">Hapus</button>
</div>
</li>`;
}
