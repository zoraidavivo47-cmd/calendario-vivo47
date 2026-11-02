// Public read-only feed: Lista. Other spreadsheet tabs are not published.
(() => {
  'use strict';
  const SOURCE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6RzJQApGC_bDeoxvI1I2N9J7nJgOzZgB9RJyRSENCkG2TKMGB5kAxjNu5SmHX0HlG8j5Z7bIQaT1U/pub?gid=910156101&single=true&output=csv';
  const CACHE_KEY = 'vivo47-calendar-2027-live-v1';
  let busy = false;
  function parseCSV(text) {
    const rows = []; let row = [], cell = '', quoted = false;
    text = text.replace(/^\uFEFF/, '');
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        if (quoted && text[i + 1] === '"') { cell += '"'; i++; }
        else if (quoted || cell === '') quoted = !quoted;
        else cell += c;
      } else if (c === ',' && !quoted) { row.push(cell); cell = ''; }
      else if ((c === '\n' || c === '\r') && !quoted) {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(cell); if (row.some(v => v.trim())) rows.push(row);
        row = []; cell = '';
      } else cell += c;
    }
    if (quoted) throw new Error('Incomplete CSV');
    row.push(cell); if (row.some(v => v.trim())) rows.push(row);
    if (!rows.length || rows[0][0].trim().toUpperCase() !== 'FECHA' || rows[0][2]?.trim().toUpperCase() !== 'ACTIVIDAD') throw new Error('Unexpected calendar columns');
    return rows.slice(1).map(r => r.slice(0, 7));
  }
  function show(data) { window.dispatchEvent(new CustomEvent('calendar:data', { detail: data })); }
  try {
    const data = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (Array.isArray(data?.rows)) show(data);
  } catch (_) {}
  async function refresh() {
    if (busy || !SOURCE_URL) return;
    busy = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const url = new URL(SOURCE_URL); url.searchParams.set('_', Date.now());
      const response = await fetch(url, { cache: 'no-store', credentials: 'omit', signal: controller.signal });
      if (!response.ok) throw new Error('Calendar unavailable');
      const data = { rows: parseCSV(await response.text()), updatedAt: new Date().toISOString() };
      show(data);
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch (_) {}
    } catch (_) { window.dispatchEvent(new Event('calendar:offline')); }
    finally { clearTimeout(timeout); busy = false; }
  }
  refresh();
  setInterval(() => { if (!document.hidden) refresh(); }, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  window.addEventListener('online', refresh);
})();
