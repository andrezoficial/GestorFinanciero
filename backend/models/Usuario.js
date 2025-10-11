// Importamos las clases necesarias de Sequelize
const { Model, DataTypes } = require('sequelize');

// Importamos la conexión a la base de datos
const sequelize = require('../connection/db/db');

// Definimos la clase Usuario que hereda de Model
class Usuario extends Model {}

// Inicializamos el modelo con sus atributos y configuración
Usuario.init({
    // ID: Identificador único autoincremental
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // Nombre del usuario
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    // Apellido del usuario
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    // Email único del usuario
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    // Contraseña del usuario (se almacenará hasheada)
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    // Teléfono opcional
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    // Rol del usuario (admin o usuario)
    rol: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'usuario',
        validate: {
            isIn: [['admin', 'usuario']]
        }
    },
    // Estado del usuario (activo o inactivo)
    estado: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'activo',
        validate: {
            isIn: [['activo', 'inactivo']]
        }
    }
}, {
    // Configuración adicional del modelo
    sequelize, // Instancia de conexión
    modelName: 'Usuario', // Nombre del modelo
    tableName: 'usuarios', // Nombre de la tabla en la base de datos
    timestamps: true, // Habilita los campos de timestamps
    createdAt: 'fecha_creacion', // Nombre personalizado para createdAt
    updatedAt: 'fecha_actualizacion' // Nombre personalizado para updatedAt
});

// Exportamos el modelo
module.exports = Usuario;