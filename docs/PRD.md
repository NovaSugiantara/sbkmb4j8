# PRD — Candle Collection Log

## 1. Ringkasan

Aplikasi single-page untuk mencatat koleksi lilin (jar, pillar, tin) yang dimiliki/pernah dibakar, agar user tidak lupa scent apa yang sudah dicoba, disukai, atau bermasalah (tunneling, dll).

## 2. Masalah

User punya banyak lilin tapi tidak ada catatan terpusat → berpotensi beli ulang scent yang sama, lupa mana yang bagus/buruk.

## 3. Target User

Individu penghobi lilin (candle enthusiast), single-user, personal use di browser sendiri (tanpa akun/login).

## 4. Tujuan Produk

- User bisa tambah, ubah, hapus data candle dengan cepat.
- Data bertahan setelah refresh (localStorage).
- Tampilan hangat & nyaman dipandang (amber tone, soft shadow).

## 5. Fitur Utama (MVP)

| #   | Fitur         | Deskripsi                                                 |
| --- | ------------- | --------------------------------------------------------- |
| F1  | Tambah candle | Form: name*, brand, scent notes, status*, rating\*, notes |
| F2  | Edit candle   | Ubah data entry yang sudah ada                            |
| F3  | Hapus candle  | Hapus entry (dengan konfirmasi)                           |
| F4  | Grid card     | Tampilkan semua candle dalam card layout                  |
| F5  | Summary bar   | Total candle, jumlah Burning, jumlah Finished             |
| F6  | Rating        | 1–5 flame/star, visual & input                            |
| F7  | Persist data  | Auto-save ke localStorage tiap perubahan                  |

## 6. Non-Goals (Out of Scope)

- Tidak ada backend/API, tidak ada akun/login.
- Tidak ada sync multi-device.
- Tidak ada upload foto candle.
- Tidak ada sorting/filter kompleks (nice-to-have, bukan MVP).

## 7. Success Metric

- Seluruh alur CRUD berjalan tanpa data hilang saat refresh.
- Total raw source code (exclude markdown & gambar) tetap di bawah cap 25KB kumulatif.
