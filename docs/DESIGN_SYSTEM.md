# DESIGN_SYSTEM — Candle Collection Log

Tema: hangat, "flickering candle" feel — amber, cream, soft shadow.

## 1. Color Tokens
```css
--color-bg: #FFF8F0;        /* cream background */
--color-surface: #FFFFFF;
--color-text: #3A2618;      /* deep brown */
--color-text-muted: #8A6F5C;
--color-primary: #D97706;   /* amber 600 */
--color-primary-dark: #92400E;
--color-flame: #F59E0B;     /* rating flame */
--color-flame-off: #E7DCCF;
--color-border: #EADFD2;

--color-unlit: #A8A29E;
--color-burning: #EA580C;
--color-finished: #78716C;
```

## 2. Typography
- Font: system-ui / native font stack (hindari @font-face → hemat size & network).
- Heading: weight 600–700, warna `--color-primary-dark`.
- Body: weight 400, warna `--color-text`.
- Scale: 12 / 14 / 16 / 20 / 28 px.

## 3. Spacing & Radius
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 px.
- Radius card: 12px. Radius button/input: 8px.

## 4. Shadow (soft/cozy)
```css
--shadow-card: 0 2px 8px rgba(146,64,14,.08), 0 1px 2px rgba(146,64,14,.06);
--shadow-hover: 0 6px 16px rgba(146,64,14,.14);
```

## 5. Komponen
- **Card (candle)**: bg surface, `--shadow-card`, radius 12, padding 16. Hover → `--shadow-hover` + translateY(-2px).
- **Status Badge**: pill kecil, warna sesuai status (unlit/burning/finished).
- **Rating (Flame)**: 5 icon 🔥 (unicode/inline svg minimal). Filled = `--color-flame`, empty = `--color-flame-off`. Interaktif saat input.
- **Button Primary**: bg `--color-primary`, teks putih, radius 8, hover → `--color-primary-dark`.
- **Button Danger** (delete): border only, warna merah muted.
- **Form/Modal**: overlay coklat gelap semi-transparan, panel surface radius 12, input border `--color-border`, focus ring `--color-primary`.
- **Summary Bar**: sticky top, 3 stat (Total/Burning/Finished), background gradasi amber tipis.

## 6. Motion
- Transisi standar: 150–200ms ease-out untuk hover/shadow.
- Opsional: flicker animation ringan (opacity 0.9–1, CSS keyframes) pada flame icon status "Burning" — bukan GIF/asset.

## 7. Empty State
Teks saja (no image asset): "Belum ada candle. Tambahkan koleksi pertamamu 🕯️"
