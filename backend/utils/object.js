function pick(obj = {}, allowed = []) {
  if (!Array.isArray(allowed) || allowed.length === 0) return obj;
  return Object.fromEntries(Object.entries(obj).filter(([k]) => allowed.includes(k)));
}
function ensureInt(v, def = 0) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : def;
}
module.exports = { pick, ensureInt };
