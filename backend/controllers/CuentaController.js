const Cuenta = require('../models/Cuenta');
const crudFactory = require('../factories/crudFactory');

module.exports = crudFactory({
  model: Cuenta,
  defaultSort: 'id',
  defaultOrder: 'ASC',
  createFields: ['nombre','tipo','saldo','numero_cuenta','banco','moneda'],
  updateFields: ['nombre','tipo','saldo','numero_cuenta','banco','moneda'],
  whereBuilder: (req) => ({ usuario_id: req.user.id }),
  onBeforeCreate: (req, body) => ({ ...body, usuario_id: req.user.id }),
  queryMap: {
    tipo:   { col: 'tipo', op: 'eq' },
    moneda: { col: 'moneda', op: 'eq' },
    q:      { col: 'nombre', op: 'like' }
  }
});
