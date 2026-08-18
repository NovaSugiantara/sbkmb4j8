# DESIGN (Frontend) — Candle Collection Log

## 1. Tech Stack
- **TypeScript** (native ESM output, tanpa bundler)
- **HTML5 + CSS3** murni — tanpa framework/library
- Compile: `tsc` → `.js` di sebelah `.ts`, di-load via `<script type="module">`
- Zero runtime dependency. Dev dependency hanya `typescript`.

Alasan: menjaga ukuran source sekecil mungkin (budget 25KB kumulatif), hindari overhead config/lockfile bundler.

## 2. Struktur Folder (business logic dipecah, bukan 1 file)
```
/src
  types.ts          # Candle, CandleStatus
  storage.ts         # get/save ke localStorage (isolasi side-effect)
  store.ts            # in-memory state + subscribe/notify (pub-sub kecil)
  candle-service.ts   # addCandle, updateCandle, deleteCandle (logic murni)
  validate.ts         # validasi input form
  id.ts                # generate id (crypto.randomUUID + fallback)
  render/
    app.ts             # entry render, wiring semua bagian
    card.ts             # render 1 card candle
    list.ts              # render grid dari list candle
    summary.ts            # render summary bar
    form.ts                 # render form add/edit (modal)
    rating.ts                # render + handle input flame rating
    dom.ts                     # helper kecil (createEl, qs, dll)
  main.ts               # bootstrap: load data → init store → render
/styles
  tokens.css          # css variables (design tokens)
  base.css             # reset minimal + typografi
  layout.css            # grid, summary bar
  components.css        # card, badge, button, form, rating
index.html
tsconfig.json
```
Setiap file ditarget kecil (~1–3 KB) agar mudah dipecah per commit dan gampang di-review.

## 3. Alur Data (one-way, tanpa framework)
```
User action (click/submit)
  → candle-service.ts (mutasi business logic)
  → store.ts (update state + persist via storage.ts)
  → store notify subscribers
  → render/app.ts re-render bagian terkait (list + summary)
```
`store.ts` = single source of truth in-memory; `storage.ts` cuma I/O localStorage (dipanggil store tiap state berubah → auto-save, FR-8).

## 4. Rendering Strategy
- Tanpa virtual DOM. Fungsi re-render per section (`renderList`, `renderSummary`) generate ulang innerHTML dari state — cukup untuk skala data personal.
- Event listener via delegation di container list (1 listener untuk semua card: edit/delete) untuk minim kode.

## 5. Komponen UI → Modul
| UI | Module |
|----|--------|
| Summary bar | `render/summary.ts` |
| Grid card candle | `render/list.ts` + `render/card.ts` |
| Form tambah/edit (modal) | `render/form.ts` |
| Rating flame (display & input) | `render/rating.ts` |

## 6. Budget Ukuran (indikatif, raw source)
| File | Estimasi |
|------|---------|
| types.ts | ~0.3 KB |
| storage.ts | ~0.6 KB |
| store.ts | ~1 KB |
| candle-service.ts | ~1 KB |
| validate.ts + id.ts | ~0.7 KB |
| render/*.ts (6 file) | ~4–5 KB |
| main.ts + dom.ts | ~0.6 KB |
| styles/*.css (4 file) | ~4–5 KB |
| index.html | ~1 KB |
| **Total perkiraan** | **~13–15 KB** (buffer di bawah cap 25KB) |

## 7. Testing (opsional)
Jika sempat: unit test kecil untuk `candle-service.ts` & `validate.ts` pakai `node:test` bawaan Node (hindari dependency berat seperti Jest/Vitest).
