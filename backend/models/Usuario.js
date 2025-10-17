// models/Usuario.js
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../connection/db/db');

class Usuario extends Model {
  // helper para login
  async validarPassword(plain) { return bcrypt.compare(plain, this.password); }
  // ocultar password en respuestas JSON
  toJSON() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }
}

Usuario.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  apellido: { type: DataTypes.STRING(100), allowNull: false },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: { type: DataTypes.STRING(255), allowNull: false },
  telefono: { type: DataTypes.STRING(20) },
  rol: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'usuario',
    validate: { isIn: [['admin', 'usuario']] }
  },
  estado: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'activo',
    validate: { isIn: [['activo', 'inactivo']] }
  }
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuarios',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion',
  defaultScope: { attributes: { exclude: ['password'] } }, // oculta password por defecto
  hooks: {
    beforeValidate(user) {
      if (user.email) user.email = user.email.trim().toLowerCase();
    },
    async beforeSave(user) {
      // solo hashea si la contraseña cambió o es nueva
      if (user.changed('password')) {
        const SALT_ROUNDS = 10;
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
      }
    }
  }
});

module.exports = Usuario;
