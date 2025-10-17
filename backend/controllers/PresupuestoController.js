const { Op } = require('sequelize');
const Presupuesto = require('../models/Presupuesto');
const Categoria = require('../models/Categoria');
const Transaccion = require('../models/Transaccion');
const crudFactory = require('../factories/crudFactory');
const asyncHandler = require('../utils/asyncHandler');

// CRUD básico usando el factory
const baseCrud = crudFactory({
  model: Presupuesto,
  defaultSort: 'fecha_inicio',
  defaultOrder: 'DESC',
  createFields: ['categoria_id', 'monto_limite', 'periodo', 'fecha_inicio', 'fecha_fin'],
  updateFields: ['categoria_id', 'monto_limite', 'periodo', 'fecha_inicio', 'fecha_fin'],
  whereBuilder: (req) => ({ usuario_id: req.user.id }),
  onBeforeCreate: (req, body) => ({
    ...body,
    usuario_id: req.user.id
    // fecha_inicio y fecha_fin se pasan como strings 'YYYY-MM-DD'
  }),
  onBeforeUpdate: (req, body) => ({
    ...body
    // fecha_inicio y fecha_fin se pasan como strings 'YYYY-MM-DD'
  }),
  includeBuilder: () => [
    {
      model: Categoria,
      attributes: ['id', 'nombre', 'tipo', 'color', 'icono']
    }
  ],
  queryMap: {
    periodo: { col: 'periodo', op: 'eq' },
    categoria_id: { col: 'categoria_id', op: 'eq' }
  }
});

/**
 * Obtener el estado actual de un presupuesto (gasto vs límite)
 */
const getEstadoPresupuesto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Buscar el presupuesto
  const presupuesto = await Presupuesto.findOne({
    where: { 
      id, 
      usuario_id: req.user.id 
    },
    include: [
      {
        model: Categoria,
        attributes: ['id', 'nombre', 'tipo', 'color', 'icono']
      }
    ]
  });

  if (!presupuesto) {
    return res.status(404).json({ message: 'Presupuesto no encontrado' });
  }

  // Calcular el gasto real en el período
  const gastoReal = await Transaccion.sum('monto', {
    where: {
      usuario_id: req.user.id,
      categoria_id: presupuesto.categoria_id,
      tipo: 'egreso',
      fecha_transaccion: {
        [Op.between]: [presupuesto.fecha_inicio, presupuesto.fecha_fin]
      }
    }
  }) || 0;

  const montoLimite = parseFloat(presupuesto.monto_limite);
  const porcentajeUsado = (gastoReal / montoLimite) * 100;
  const disponible = montoLimite - gastoReal;
  
  // Determinar el estado
  let estado = 'normal';
  if (porcentajeUsado >= 100) {
    estado = 'excedido';
  } else if (porcentajeUsado >= 80) {
    estado = 'alerta';
  } else if (porcentajeUsado >= 50) {
    estado = 'advertencia';
  }

  res.json({
    presupuesto: presupuesto.toJSON(),
    estadisticas: {
      monto_limite: montoLimite,
      gasto_real: parseFloat(gastoReal.toFixed(2)),
      disponible: parseFloat(disponible.toFixed(2)),
      porcentaje_usado: parseFloat(porcentajeUsado.toFixed(2)),
      estado,
      dias_restantes: Math.ceil((new Date(presupuesto.fecha_fin) - new Date()) / (1000 * 60 * 60 * 24))
    }
  });
});

/**
 * Obtener resumen de todos los presupuestos activos del usuario
 */
const getResumenPresupuestos = asyncHandler(async (req, res) => {
  const ahora = new Date();
  
  // Buscar presupuestos activos
  const presupuestos = await Presupuesto.findAll({
    where: {
      usuario_id: req.user.id,
      fecha_inicio: { [Op.lte]: ahora },
      fecha_fin: { [Op.gte]: ahora }
    },
    include: [
      {
        model: Categoria,
        attributes: ['id', 'nombre', 'tipo', 'color', 'icono']
      }
    ],
    order: [['fecha_inicio', 'DESC']]
  });

  // Calcular estadísticas para cada presupuesto
  const resumen = await Promise.all(
    presupuestos.map(async (presupuesto) => {
      const gastoReal = await Transaccion.sum('monto', {
        where: {
          usuario_id: req.user.id,
          categoria_id: presupuesto.categoria_id,
          tipo: 'egreso',
          fecha_transaccion: {
            [Op.between]: [presupuesto.fecha_inicio, presupuesto.fecha_fin]
          }
        }
      }) || 0;

      const montoLimite = parseFloat(presupuesto.monto_limite);
      const porcentajeUsado = (gastoReal / montoLimite) * 100;
      const disponible = montoLimite - gastoReal;
      
      let estado = 'normal';
      if (porcentajeUsado >= 100) estado = 'excedido';
      else if (porcentajeUsado >= 80) estado = 'alerta';
      else if (porcentajeUsado >= 50) estado = 'advertencia';

      return {
        ...presupuesto.toJSON(),
        estadisticas: {
          gasto_real: parseFloat(gastoReal.toFixed(2)),
          disponible: parseFloat(disponible.toFixed(2)),
          porcentaje_usado: parseFloat(porcentajeUsado.toFixed(2)),
          estado
        }
      };
    })
  );

  // Estadísticas generales
  const totalLimite = presupuestos.reduce((sum, p) => sum + parseFloat(p.monto_limite), 0);
  const totalGastado = resumen.reduce((sum, r) => sum + r.estadisticas.gasto_real, 0);
  const presupuestosExcedidos = resumen.filter(r => r.estadisticas.estado === 'excedido').length;
  const presupuestosAlerta = resumen.filter(r => r.estadisticas.estado === 'alerta').length;

  res.json({
    presupuestos: resumen,
    resumen_general: {
      total_presupuestos: presupuestos.length,
      total_limite: parseFloat(totalLimite.toFixed(2)),
      total_gastado: parseFloat(totalGastado.toFixed(2)),
      total_disponible: parseFloat((totalLimite - totalGastado).toFixed(2)),
      presupuestos_excedidos: presupuestosExcedidos,
      presupuestos_en_alerta: presupuestosAlerta
    }
  });
});

module.exports = {
  ...baseCrud,
  getEstadoPresupuesto,
  getResumenPresupuestos
};
