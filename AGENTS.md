# AGENTS.md

Panduan untuk AI coding agent (Claude Code, dll.) yang bekerja di repo **Candle Collection Log**.

## Baca Dulu

- `docs/BRIEF.md`
- `docs/PRD.md` — kebutuhan produk
- `docs/SRS.md` — requirement fungsional & non-fungsional, data model
- `docs/DESIGN_SYSTEM.md` — token warna/typografi/komponen
- `docs/DESIGN.md` — struktur folder & arsitektur frontend

## Aturan Wajib

1. **Tech stack**: TypeScript murni + HTML/CSS. Dilarang menambah framework (React/Vue/Svelte) atau library CSS (Tailwind/Bootstrap) tanpa persetujuan eksplisit user — semua itu menambah bobot commit.
2. **Commit size cap**: total **raw source kumulatif ≤ 25KB** (markdown & gambar tidak dihitung). Sebelum commit, cek total ukuran (mis. `du -cb src styles index.html`). Jika mendekati limit:
   - Pecah file besar jadi beberapa modul kecil.
   - Minify CSS/JS bila perlu (hapus komentar/whitespace berlebih).
   - Pecah jadi beberapa commit kecil, jangan satu commit besar.
3. **Jangan taruh business logic di satu file besar.** Ikuti struktur folder di `DESIGN.md`: pisahkan `types`, `storage`, `store`, `candle-service`, `validate`, dan tiap komponen render ke file masing-masing.
4. **No bundler/heavy tooling** kecuali diminta user. Kompilasi cukup pakai `tsc`. Jangan tambah devDependency yang tidak perlu.
5. **Semua mutasi data harus lewat `candle-service.ts`** — jangan mutate state langsung dari kode render.
6. **Persistensi**: tiap perubahan state wajib tersimpan ke localStorage (via `storage.ts`), bungkus parsing dengan try/catch (jangan crash saat data corrupt).
7. **Validasi** input form via `validate.ts` sebelum masuk ke service — jangan taruh validasi di file render.
8. **Loading&Empty** pastikan terakomodasi dengan baik.

## Checklist Sebelum Commit

- [ ] Total ukuran source (exclude `.md`, gambar) masih di bawah 25KB kumulatif.
- [ ] Tidak ada file tunggal yang menggabungkan lebih dari satu tanggung jawab (SRP).
- [ ] `tsc` compile tanpa error.
- [ ] Fitur CRUD + summary bar + persist localStorage sudah dites manual di browser.

## Konvensi

- Nama file: `kebab-case`. Nama tipe/interface: `PascalCase`. Fungsi/variabel: `camelCase`.
- Commit message singkat & deskriptif per potongan kecil, contoh:
  - `feat: add candle-service create/update/delete`
  - `style: card + rating css`
  - `feat: render summary bar`
