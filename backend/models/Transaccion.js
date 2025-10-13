const { DataTypes } = require('sequelize');
const sequelize = require('../connection/db/db');
const Usuario = require('./Usuario');
const Categoria = require('./Categoria');
const Cuenta = require('./Cuenta');

const Transaccion = sequelize.define('Transaccion', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  tipo: { type: DataTypes.ENUM('ingreso', 'egreso'), allowNull: false },
  monto: { type: DataTypes.DECIMAL(12,2), allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  fecha_transaccion: { type: DataTypes.DATE, allowNull: false },
  estado: { type: DataTypes.STRING(20), defaultValue: 'completada' },
  comprobante_url: { type: DataTypes.TEXT }
}, {
  tableName: 'transacciones',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion'
});

// FKs según tu diagrama
Usuario.hasMany(Transaccion, { foreignKey: { name: 'usuario_id', allowNull: true }, onDelete: 'SET NULL' });
Transaccion.belongsTo(Usuario, { foreignKey: { name: 'usuario_id', allowNull: true } });

Categoria.hasMany(Transaccion, { foreignKey: { name: 'categoria_id', allowNull: true }, onDelete: 'SET NULL' });
Transaccion.belongsTo(Categoria, { foreignKey: { name: 'categoria_id', allowNull: true } });

Cuenta.hasMany(Transaccion, { foreignKey: { name: 'cuenta_id', allowNull: true }, onDelete: 'SET NULL' });
Transaccion.belongsTo(Cuenta, { foreignKey: { name: 'cuenta_id', allowNull: true } });

module.exports = Transaccion;