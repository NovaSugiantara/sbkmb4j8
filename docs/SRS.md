# SRS — Candle Collection Log

## 1. Functional Requirements
- **FR-1** User dapat menambah candle baru via form (name*, brand, scentNotes, status*, rating*, notes).
- **FR-2** User dapat mengedit candle yang sudah ada.
- **FR-3** User dapat menghapus candle (dengan confirm dialog).
- **FR-4** Sistem menampilkan seluruh candle sebagai card grid.
- **FR-5** Sistem menampilkan summary bar: total, count Burning, count Finished.
- **FR-6** Status candle: enum `unlit | burning | finished`.
- **FR-7** Rating: integer 1–5, ditampilkan sebagai flame icon.
- **FR-8** Semua perubahan (add/edit/delete) langsung disimpan ke localStorage.
- **FR-9** Saat load, data direstore dari localStorage; jika kosong/corrupt → fallback ke state kosong (tidak boleh crash).
- **FR-10** Validasi: `name` wajib diisi, `rating` 1–5, `status` harus salah satu enum valid.

## 2. Data Model
```ts
type CandleStatus = 'unlit' | 'burning' | 'finished';

interface Candle {
  id: string;          // random id
  name: string;
  brand?: string;
  scentNotes: string[];
  status: CandleStatus;
  rating: number;       // 1-5
  notes?: string;
  createdAt: number;    // epoch ms
  updatedAt: number;
}
```
Storage key: `candle-log:v1` → `JSON.stringify(Candle[])`

## 3. Non-Functional Requirements
- **NFR-1 Tech constraint**: TypeScript, tanpa framework (React/Vue/dll), tanpa CSS framework (Tailwind/Bootstrap) — demi ukuran bundle.
- **NFR-2 Commit size budget**: total raw source (ts/js/css/html, exclude .md & gambar) kumulatif **≤ 25KB**. File dipecah kecil (idealnya ≤ ~2–3KB/file).
- **NFR-3 Performance**: render list puluhan–ratusan item tanpa lag terasa (tidak perlu virtualization).
- **NFR-4 Persistence**: localStorage saja, tidak ada network call.
- **NFR-5 Browser support**: evergreen browser modern, ES2020+, native ESM.
- **NFR-6 Accessibility**: label form yang benar, kontras warna WCAG AA, keyboard-navigable.
- **NFR-7 Toolchain ringan**: kompilasi via `tsc` langsung ke ESM, tanpa bundler.
- **NFR-8 Resilience**: `JSON.parse` localStorage dibungkus try/catch.

## 4. Assumptions
- Single-user, single-browser, tidak butuh sync realtime multi-tab.
- Automated testing bersifat opsional untuk MVP.
