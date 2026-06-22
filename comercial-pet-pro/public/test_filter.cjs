const data = require('./data.json');
const rows = data.filter(d => d.index_ !== 'header');
const headerRow = data.find(d => d.index_ === 'header')?.row || [];
const findCol = (name) => {
    const idx = headerRow.findIndex(h => h && h.toString().toLowerCase().includes(name.toLowerCase()));
    return idx === -1 ? null : idx;
};
const idxCanales = findCol('Canales');
console.log('idxCanales:', idxCanales);

const clientLogged = { canales: "C4" };
const clientCanales = clientLogged?.canales
  ? clientLogged.canales.split(',').map(c => c.trim()).filter(Boolean)
  : [];
console.log('clientCanales:', clientCanales);

const filteredRows = rows.filter(item => {
  let matchesCanal = true;
  if (idxCanales !== null && clientCanales.length > 0) {
    const productCanales = String(item.row[idxCanales] || '')
      .split(',').map(c => c.trim()).filter(Boolean);
    if (productCanales.length > 0) {
      matchesCanal = productCanales.some(pc => clientCanales.includes(pc));
    }
  }
  return matchesCanal;
});
console.log('Filtered rows count:', filteredRows.length);
