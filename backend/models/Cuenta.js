const { DataTypes } = require('sequelize');
const sequelize = require('../connection/db/db');
const Usuario = require('./Usuario');

const Cuenta = sequelize.define('Cuenta', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  tipo: { type: DataTypes.STRING(20), allowNull: false },
  saldo: { type: DataTypes.DECIMAL(12,2), defaultValue: 0, allowNull: false },
  numero_cuenta: { type: DataTypes.STRING(50) },
  banco: { type: DataTypes.STRING(100) },
  moneda: { type: DataTypes.STRING(3), defaultValue: 'ARS', allowNull: false }
}, {
  tableName: 'cuentas',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion'
});

// FK: cuentas.usuario_id -> usuarios.id
Usuario.hasMany(Cuenta, { foreignKey: { name: 'usuario_id', allowNull: true }, onDelete: 'SET NULL' });
Cuenta.belongsTo(Usuario, { foreignKey: { name: 'usuario_id', allowNull: true } });

module.exports = Cuenta;