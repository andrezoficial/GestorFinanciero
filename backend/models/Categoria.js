const { DataTypes } = require('sequelize');
const sequelize = require('../connection/db/db');

const Categoria = sequelize.define('Categoria', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  tipo: { type: DataTypes.ENUM('ingreso', 'egreso'), allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  color: { type: DataTypes.STRING(7) },
  icono: { type: DataTypes.STRING(50) }
}, {
  tableName: 'categorias',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion'
});

module.exports = Categoria;