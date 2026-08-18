# Candle Collection Log

Catatan koleksi lilin pribadi — tambah, edit, hapus, dan ringkas koleksi; data tersimpan di `localStorage` browser.

## Cara menjalankan

```sh
npm install     # devDependency: typescript saja
npm run build   # tsc -> dist/ (native ESM)
# lalu buka index.html di browser (atau serve folder ini)
```

## Catatan

- `dist/` adalah build artifact dan **tidak di-commit** (gitignored) — total raw source tetap di bawah cap 25KB.
- Tanpa framework/library/bundler; TypeScript murni + HTML/CSS.
