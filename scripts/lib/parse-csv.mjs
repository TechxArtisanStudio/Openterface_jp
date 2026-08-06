/** RFC-style CSV parse/serialize (shared by youtube + social-posts sync). */

export function parseCsv(text) {
  const lines = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (c === '"' && next === '"') {
        field += '"';
        i++;
      } else if (c === '"') inQuotes = false;
      else field += c;
      continue;
    }
    if (c === '"') inQuotes = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || (c === '\r' && next === '\n')) {
      row.push(field);
      if (row.some((cell) => cell.length > 0)) lines.push(row);
      row = [];
      field = '';
      if (c === '\r') i++;
    } else if (c !== '\r') field += c;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((cell) => cell.length > 0)) lines.push(row);
  }
  if (lines.length < 2) return { headers: [], rows: [] };

  const headers = lines[0].map((h) => h.trim());
  const rows = lines.slice(1).map((cells) => {
    const record = {};
    headers.forEach((h, idx) => {
      record[h] = cells[idx] ?? '';
    });
    return record;
  });
  return { headers, rows };
}

function escapeCsvField(value) {
  const s = value ?? '';
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function serializeCsv(headers, rows) {
  const headerLine = headers.map(escapeCsvField).join(',');
  const body = rows.map((row) => headers.map((h) => escapeCsvField(row[h] ?? '')).join(','));
  return [headerLine, ...body].join('\n') + '\n';
}
