const Categoria = require('../models/Categoria');
const crudFactory = require('../factories/crudFactory');

module.exports = crudFactory({
  model: Categoria,
  defaultSort: 'id',
  defaultOrder: 'ASC',
  createFields: ['nombre','tipo','descripcion','color','icono'],
  updateFields: ['nombre','tipo','descripcion','color','icono'],
  queryMap: {
    tipo: { col: 'tipo', op: 'eq' },  // ?tipo=ingreso|egreso
    q:    { col: 'nombre', op: 'like' }
  }
});
