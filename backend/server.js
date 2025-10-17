const express = require('express');
const cors = require('cors');
const sequelize = require('./connection/db/db');
const authRoutes = require('./routes/auth.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();
const PORT = process.env.PORT || 3001;

// 👇 Cargar modelos aquí (solo side-effects: definen tablas y asociaciones)
require('./models/Usuario');
require('./models/Categoria');
require('./models/Cuenta');
require('./models/Transaccion');
require('./models/Presupuesto');

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/categorias', require('./routes/categorias.routes'));
app.use('/api/cuentas', require('./routes/cuentas.routes'));
app.use('/api/transacciones', require('./routes/transacciones.routes'));
app.use('/api/presupuestos', require('./routes/presupuestos.routes'));
app.use('/api/auth', authRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Levantar servidor solo cuando la DB esté lista (recomendado)
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false }); // o { alter: true } si estás iterando
    console.log('Base de datos sincronizada');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
})();
