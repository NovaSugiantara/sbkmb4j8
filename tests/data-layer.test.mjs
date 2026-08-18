// Data-layer unit tests (node:test). Import compiled dist/ (gitignored, built by npm test).
// Judgment call: tests/ are verification tooling, not app source — excluded from the
// 25KB raw-source cap (same class as .md), per DESIGN.md's "unit test kecil ... node:test" suggestion.
import { test } from 'node:test';
import assert from 'node:assert/strict';

// Node has no localStorage by default; tiny in-memory shim
const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, v),
};

const { loadCandles, saveCandles } = await import('../dist/storage.js');
const { createStore } = await import('../dist/store.js');
const svc = await import('../dist/candle-service.js');
const { validateCandle } = await import('../dist/validate.js');
const { createId } = await import('../dist/id.js');

const GOOD = { id: 'a', name: 'Amber', scentNotes: ['amber'], status: 'burning', rating: 4, createdAt: 1, updatedAt: 2 };
const draft = (over = {}) => ({ name: 'Amber Noir', brand: ' Maison Lune ', scentNotes: 'amber, vanilla , cengkih', status: 'burning', rating: 4, notes: 'hangat', ...over });

test('storage: save/load roundtrip', () => {
  mem.clear();
  saveCandles([GOOD]);
  assert.deepEqual(loadCandles(), [GOOD]);
});

test('storage: corrupt JSON and non-array fall back to []', () => {
  mem.set('candle-log:v1', '{bad');
  assert.equal(loadCandles().length, 0);
  mem.set('candle-log:v1', JSON.stringify({ nope: 1 }));
  assert.equal(loadCandles().length, 0);
});

test('storage: malformed entries filtered, valid kept (FR-9)', () => {
  mem.set('candle-log:v1', JSON.stringify([
    GOOD,
    { id: '', name: 'x', scentNotes: [], status: 'unlit', rating: 3, createdAt: 1, updatedAt: 1 },
    { id: 'b', name: '   ', scentNotes: [], status: 'unlit', rating: 3, createdAt: 1, updatedAt: 1 },
    { id: 'c', name: 'x', scentNotes: [], status: 'evil', rating: 3, createdAt: 1, updatedAt: 1 },
    { id: 'd', name: 'x', scentNotes: [], status: 'unlit', rating: 9, createdAt: 1, updatedAt: 1 },
    { id: 'e', name: 'x', scentNotes: 'nope', status: 'unlit', rating: 3, createdAt: 1, updatedAt: 1 },
  ]));
  assert.deepEqual(loadCandles(), [GOOD]);
});

test('store: commit replaces state, notifies, persists', () => {
  mem.clear();
  const store = createStore([]);
  const seen = [];
  store.subscribe((c) => seen.push(c.length));
  store.commit([GOOD]);
  assert.equal(store.getCandles().length, 1);
  assert.deepEqual(seen, [1]);
  assert.deepEqual(loadCandles(), [GOOD]); // persisted
});

test('candle-service: add normalizes draft and timestamps', () => {
  mem.clear();
  const store = createStore([]);
  const added = svc.addCandle(store, draft());
  assert.equal(store.getCandles().length, 1);
  assert.equal(added.name, 'Amber Noir');
  assert.equal(added.brand, 'Maison Lune'); // trimmed
  assert.deepEqual(added.scentNotes, ['amber', 'vanilla', 'cengkih']); // split + trim + filter
  assert.ok(added.id);
  assert.equal(added.createdAt, added.updatedAt);
});

test('candle-service: update preserves createdAt, bumps updatedAt (FR-2)', () => {
  const store = createStore(loadCandles());
  const before = store.getCandles()[0];
  const updated = svc.updateCandle(store, before.id, draft({ name: 'Renamed', status: 'finished', rating: 5 }));
  assert.equal(updated.name, 'Renamed');
  assert.equal(updated.status, 'finished');
  assert.equal(updated.rating, 5);
  assert.equal(updated.createdAt, before.createdAt);
  assert.ok(updated.updatedAt > before.updatedAt);
});

test('candle-service: delete removes candle (FR-3)', () => {
  const store = createStore(loadCandles());
  const id = store.getCandles()[0].id;
  svc.deleteCandle(store, id);
  assert.equal(store.getCandles().length, 0);
});

test('candle-service: unknown id is a no-op (0 notify, 0 persist)', () => {
  mem.clear();
  const store = createStore([]);
  let notified = 0;
  store.subscribe(() => notified++);
  assert.equal(svc.updateCandle(store, 'missing', draft()), undefined);
  svc.deleteCandle(store, 'missing');
  assert.equal(notified, 0);
  assert.equal(loadCandles().length, 0);
});

test('validate: FR-10 name required (blank/whitespace rejected)', () => {
  assert.equal(validateCandle(draft({ name: '' })).valid, false);
  assert.equal(validateCandle(draft({ name: '   ' })).valid, false);
  assert.equal(validateCandle(draft({ name: 'Amber' })).valid, true);
});

test('validate: rating must be integer 1-5', () => {
  for (const r of [0, 6, 2.5, Number.NaN]) assert.equal(validateCandle(draft({ rating: r })).valid, false, `rating ${r}`);
  for (const r of [1, 5]) assert.equal(validateCandle(draft({ rating: r })).valid, true, `rating ${r}`);
});

test('validate: status must be valid enum (FR-6)', () => {
  assert.equal(validateCandle(draft({ status: 'weird' })).valid, false);
  for (const s of ['unlit', 'burning', 'finished']) assert.equal(validateCandle(draft({ status: s })).valid, true, s);
});

test('id: returns unique strings', () => {
  const ids = new Set(Array.from({ length: 100 }, () => createId()));
  assert.equal(ids.size, 100);
  for (const id of ids) assert.equal(typeof id, 'string');
});
