const { Op } = require('sequelize');
const asyncHandler = require('../utils/asyncHandler');
const { pick, ensureInt } = require('../utils/object');

function crudFactory(cfg = {}) {
  const {
    model,
    idParam = 'id',
    primaryKey = 'id',
    defaultSort = 'id',
    defaultOrder = 'DESC',
    createFields,
    updateFields,
    whereBuilder,
    includeBuilder,
    onBeforeCreate,
    onBeforeUpdate,
    queryMap = {}
  } = cfg;

  if (!model) throw new Error('crudFactory: cfg.model es requerido');

  const buildWhere = (req) => {
    const where = {};
    for (const [qKey, def] of Object.entries(queryMap)) {
      const val = req.query[qKey];
      if (val == null || val === '') continue;
      if (typeof def === 'string') where[def] = val;
      else {
        const { col, op = 'eq', castDate = false } = def;
        const value = castDate ? new Date(val) : val;
        if (op === 'like') where[col] = { [Op.iLike]: `%${value}%` };
        else if (op === 'gte') where[col] = { [Op.gte]: value };
        else if (op === 'lte') where[col] = { [Op.lte]: value };
        else if (op === 'in') where[col] = { [Op.in]: Array.isArray(value) ? value : [value] };
        else where[col] = value;
      }
    }
    if (typeof whereBuilder === 'function') Object.assign(where, whereBuilder(req) || {});
    return where;
  };

  const list = asyncHandler(async (req, res) => {
    const page  = Math.max(1, ensureInt(req.query.page, 1));
    const limit = Math.min(100, Math.max(1, ensureInt(req.query.limit, 20)));
    const offset = (page - 1) * limit;
    const sort  = req.query.sort || defaultSort;
    const order = (req.query.order || defaultOrder).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const where = buildWhere(req);
    const include = typeof includeBuilder === 'function' ? includeBuilder(req) : undefined;

    const { rows, count } = await model.findAndCountAll({
      where, include, limit, offset, order: [[sort, order]]
    });
    res.json({ data: rows, meta: { page, limit, total: count } });
  });

  const getById = asyncHandler(async (req, res) => {
    const where = { [primaryKey]: req.params[idParam], ...buildWhere(req) };
    const include = typeof includeBuilder === 'function' ? includeBuilder(req) : undefined;
    const item = await model.findOne({ where, include });
    if (!item) return res.status(404).json({ message: 'No encontrado' });
    res.json(item);
  });

  const create = asyncHandler(async (req, res) => {
    let payload = createFields ? pick(req.body, createFields) : req.body;
    if (typeof onBeforeCreate === 'function') payload = await onBeforeCreate(req, payload);
    const item = await model.create(payload);
    res.status(201).json(item);
  });

  const update = asyncHandler(async (req, res) => {
    const where = { [primaryKey]: req.params[idParam], ...buildWhere(req) };
    let payload = updateFields ? pick(req.body, updateFields) : req.body;
    if (typeof onBeforeUpdate === 'function') payload = await onBeforeUpdate(req, payload);
    const item = await model.findOne({ where });
    if (!item) return res.status(404).json({ message: 'No encontrado' });
    await item.update(payload);
    res.json(item);
  });

  const remove = asyncHandler(async (req, res) => {
    const where = { [primaryKey]: req.params[idParam], ...buildWhere(req) };
    const deleted = await model.destroy({ where });
    if (!deleted) return res.status(404).json({ message: 'No encontrado' });
    res.status(204).send();
  });

  return { list, getById, create, update, remove };
}

module.exports = crudFactory;
