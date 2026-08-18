import { renderRatingInput } from './rating.js';
export function renderForm() {
    return `
    <form id="candle-form" novalidate>
      <div class="field">
        <label class="field-label" for="name">Nama</label>
        <input class="input" id="name" name="name" type="text" required maxlength="80" placeholder="Contoh: Amber Noir" />
      </div>
      <div class="field">
        <label class="field-label" for="brand">Brand</label>
        <input class="input" id="brand" name="brand" type="text" maxlength="60" placeholder="Contoh: Maison Lune" />
      </div>
      <div class="field">
        <label class="field-label" for="scentNotes">Scent notes</label>
        <input class="input" id="scentNotes" name="scentNotes" type="text" placeholder="Pisahkan dengan koma, contoh: amber, vanilla" />
      </div>
      <div class="field">
        <label class="field-label" for="status">Status</label>
        <select class="input" id="status" name="status">
          <option value="unlit">Belum dinyalakan</option>
          <option value="burning">Menyala</option>
          <option value="finished">Habis</option>
        </select>
      </div>
      ${renderRatingInput()}
      <div class="field">
        <label class="field-label" for="notes">Catatan</label>
        <textarea class="input" id="notes" name="notes" rows="3" placeholder="Contoh: tunneled, wangi vanilla"></textarea>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" type="submit">Simpan</button>
        <button class="btn btn-ghost" type="button" data-action="close-form">Batal</button>
      </div>
    </form>`;
}
