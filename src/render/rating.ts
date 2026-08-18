const FLAME = '\u{1F525}';

export function renderRating(rating: number): string {
  const flames = Array.from({ length: 5 }, (_, i) =>
    `<span class="rating-flame${i < rating ? ' is-filled' : ''}" aria-hidden="true">${FLAME}</span>`
  ).join('');
  return `<span class="rating" role="img" aria-label="Rating ${rating} dari 5">${flames}</span>`;
}

export function renderRatingInput(checked?: number): string {
  const labels = [1, 2, 3, 4, 5]
    .map(
      (v) => `
      <label class="rating-input">
        <input type="radio" name="rating" value="${v}"${checked === v ? ' checked' : ''} />
        <span class="rating-flame" aria-hidden="true">${FLAME}</span>
        <span class="visually-hidden">Rating ${v}</span>
      </label>`
    )
    .join('');
  return `<fieldset class="rating-group" aria-describedby="form-errors"><legend class="field-label">Rating</legend><div class="rating-input-row">${labels}</div></fieldset>`;
}
