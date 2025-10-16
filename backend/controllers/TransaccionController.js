const { Op } = require('sequelize');
const Transaccion = require('../models/Transaccion');
const crudFactory = require('../factories/crudFactory');

module.exports = crudFactory({
  model: Transaccion,
  defaultSort: 'fecha_transaccion',
  defaultOrder: 'DESC',
  createFields: ['tipo','monto','categoria_id','cuenta_id','descripcion','fecha_transaccion','estado','comprobante_url'],
  updateFields: ['tipo','monto','categoria_id','cuenta_id','descripcion','fecha_transaccion','estado','comprobante_url'],
  whereBuilder: (req) => {
    const where = { usuario_id: req.user.id };
    const { from, to } = req.query;
    if (from || to) {
      where.fecha_transaccion = {
        ...(from ? { [Op.gte]: new Date(from) } : {}),
        ...(to   ? { [Op.lte]: new Date(to) }   : {})
      };
    }
    return where;
  },
  onBeforeCreate: (req, body) => ({
    ...body,
    usuario_id: req.user.id,
    fecha_transaccion: body.fecha_transaccion ? new Date(body.fecha_transaccion) : new Date()
  }),
  onBeforeUpdate: (req, body) => ({
    ...body,
    ...(body.fecha_transaccion ? { fecha_transaccion: new Date(body.fecha_transaccion) } : {})
  }),
  queryMap: {
    tipo:        { col: 'tipo', op: 'eq' },
    categoria_id:{ col: 'categoria_id', op: 'eq' },
    cuenta_id:   { col: 'cuenta_id', op: 'eq' },
    min:         { col: 'monto', op: 'gte' },
    max:         { col: 'monto', op: 'lte' },
    q:           { col: 'descripcion', op: 'like' }
  }
});
