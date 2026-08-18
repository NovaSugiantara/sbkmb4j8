import type { Store } from '../store.js';
import type { Candle, CandleDraft } from '../types.js';
import { addCandle, updateCandle, deleteCandle } from '../candle-service.js';
import { validateCandle } from '../validate.js';
import { qs } from './dom.js';
import { renderSummary } from './summary.js';
import { renderList } from './list.js';
import { renderForm, collectDraft, draftFromCandle } from './form.js';

export function initApp(store: Store): void {
  const summaryEl = qs('#summary-stats');
  const gridEl = qs('#candle-grid');
  const emptyEl = qs('#empty-state');
  const noticeEl = qs('#save-notice');
  const modal = qs('#candle-modal') as HTMLDialogElement;
  const formSlot = qs('#modal-form');
  const titleEl = qs('#modal-title');
  let editingId: string | null = null;

  const render = (candles: Candle[], saveOk = true): void => {
    summaryEl.innerHTML = renderSummary(candles);
    gridEl.innerHTML = renderList(candles);
    emptyEl.hidden = candles.length > 0;
    noticeEl.hidden = saveOk !== false;
  };

  const showForm = (draft?: CandleDraft): void => {
    formSlot.innerHTML = renderForm(draft);
    modal.showModal();
  };

  qs('[data-action="open-form"]').addEventListener('click', () => {
    editingId = null;
    titleEl.textContent = 'Tambah Candle';
    showForm();
  });

  modal.addEventListener('close', () => {
    editingId = null;
  });

  modal.addEventListener('click', (e) => {
    const el = e.target as HTMLElement;
    if (el.closest('[data-action="close-form"]') || el === modal) modal.close();
  });

  modal.addEventListener('submit', (e) => {
    e.preventDefault();
    const draft = collectDraft(e.target as HTMLFormElement);
    const result = validateCandle(draft);
    if (!result.valid) {
      const fields = ['name', 'rating', 'status'] as const;
      for (const field of fields) {
        const msg = result.errors[field];
        const errEl = formSlot.querySelector<HTMLElement>('#' + field + '-error');
        const input = formSlot.querySelector<HTMLElement>('[name="' + field + '"]');
        if (errEl) { errEl.hidden = !msg; errEl.textContent = msg ?? ''; }
        if (input) { if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid'); }
      }
      return;
    }
    if (editingId) updateCandle(store, editingId, draft);
    else addCandle(store, draft);
    modal.close();
  });

  gridEl.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-action]');
    if (!btn) return;
    const id = btn.dataset.id ?? '';
    const candle = store.getCandles().find((c) => c.id === id);
    if (!candle) return;
    if (btn.dataset.action === 'delete-card') {
      if (window.confirm(`Hapus "${candle.name}"?`)) deleteCandle(store, id);
    } else if (btn.dataset.action === 'edit-card') {
      editingId = candle.id;
      titleEl.textContent = 'Edit Candle';
      showForm(draftFromCandle(candle));
    }
  });

  store.subscribe(render);
  render(store.getCandles());
}
