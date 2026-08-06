import { writeFile } from 'node:fs/promises';
import { serializeCsv } from '../parse-csv.mjs';

export async function writeSocialPostsCsv(csvPath, headers, rows) {
  await writeFile(csvPath, serializeCsv(headers, rows), 'utf8');
  console.log(`✓ Wrote ${csvPath} (${rows.length} rows)`);
}
