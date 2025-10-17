const { DataTypes } = require('sequelize');
const sequelize = require('../connection/db/db');
const Usuario = require('./Usuario');
const Categoria = require('./Categoria');

const Presupuesto = sequelize.define('Presupuesto', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  monto_limite: { 
    type: DataTypes.DECIMAL(12, 2), 
    allowNull: false,
    validate: {
      min: 0.01,
      isDecimal: true
    }
  },
  periodo: { 
    type: DataTypes.STRING(20), 
    allowNull: false,
    validate: {
      isIn: [['diario', 'semanal', 'mensual', 'anual']]
    }
  },
  fecha_inicio: { 
    type: DataTypes.DATEONLY, 
    allowNull: false 
  },
  fecha_fin: { 
    type: DataTypes.DATEONLY, 
    allowNull: false,
    validate: {
      isAfterStart(value) {
        if (this.fecha_inicio && value <= this.fecha_inicio) {
          throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
        }
      }
    }
  }
}, {
  tableName: 'presupuestos',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion',
  hooks: {
    beforeValidate(presupuesto) {
      // DATEONLY acepta strings en formato 'YYYY-MM-DD', no necesita conversión
      // Solo validamos el formato si es necesario
    }
  }
});

// Relaciones
Usuario.hasMany(Presupuesto, { 
  foreignKey: { name: 'usuario_id', allowNull: false }, 
  onDelete: 'CASCADE' 
});
Presupuesto.belongsTo(Usuario, { 
  foreignKey: { name: 'usuario_id', allowNull: false } 
});

Categoria.hasMany(Presupuesto, { 
  foreignKey: { name: 'categoria_id', allowNull: false }, 
  onDelete: 'CASCADE' 
});
Presupuesto.belongsTo(Categoria, { 
  foreignKey: { name: 'categoria_id', allowNull: false } 
});

module.exports = Presupuesto;
