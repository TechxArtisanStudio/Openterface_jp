const MONTHS = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  sept: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

/** "July 3, 2025" or "3 July 2025" → "2025-07-03" */
export function instagramPostedAtToIsoDate(raw) {
  const text = (raw ?? '').trim().replace(/\s+/g, ' ');
  if (!text) return '';

  const namedMonth = text.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (namedMonth) {
    const month = MONTHS[namedMonth[1].toLowerCase()];
    if (!month) return '';
    return toIso(parseInt(namedMonth[3], 10), month, parseInt(namedMonth[2], 10));
  }

  const dayFirst = text.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (dayFirst) {
    const month = MONTHS[dayFirst[2].toLowerCase()];
    if (!month) return '';
    return toIso(parseInt(dayFirst[3], 10), month, parseInt(dayFirst[1], 10));
  }

  const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) return text;

  return '';
}

function toIso(year, month, day) {
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return '';
  const d = new Date(Date.UTC(year, month - 1, day));
  if (
    d.getUTCFullYear() !== year ||
    d.getUTCMonth() !== month - 1 ||
    d.getUTCDate() !== day
  ) {
    return '';
  }
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}
