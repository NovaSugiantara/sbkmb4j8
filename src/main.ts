import type { Candle } from './types.js';
import { renderList } from './render/list.js';
import { renderSummary } from './render/summary.js';
import { renderForm } from './render/form.js';
import { qs } from './render/dom.js';

const DUMMY_CANDLES: Candle[] = [
  {
    id: 'dummy-amber-noir',
    name: 'Amber Noir',
    brand: 'Maison Lune',
    scentNotes: ['amber', 'vanilla', 'cengkih'],
    status: 'burning',
    rating: 4,
    notes: 'Hangat dan manis, cocok untuk malam hujan.',
    createdAt: 1750000000000,
    updatedAt: 1750000000000,
  },
  {
    id: 'dummy-sea-salt',
    name: 'Sea Salt & Cedar',
    brand: 'Lilin Kita',
    scentNotes: ['sea salt', 'cedarwood'],
    status: 'unlit',
    rating: 3,
    notes: 'Aroma segar untuk ruang kerja.',
    createdAt: 1750001000000,
    updatedAt: 1750001000000,
  },
  {
    id: 'dummy-honey-blossom',
    name: 'Honey Blossom',
    brand: 'Wax & Co',
    scentNotes: ['honey', 'blossom', 'teh'],
    status: 'finished',
    rating: 5,
    notes: 'Favorit sepanjang masa, bakal dibeli lagi.',
    createdAt: 1750002000000,
    updatedAt: 1750002000000,
  },
];

qs('#summary-stats').innerHTML = renderSummary(DUMMY_CANDLES);
qs('#candle-grid').innerHTML = renderList(DUMMY_CANDLES);
qs('#modal-form').innerHTML = renderForm();
