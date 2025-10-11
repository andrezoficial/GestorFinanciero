const express = require('express');
const cors = require('cors');
const sequelize = require('./connection/db/db');
const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/api/test', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});

app.listen(PORT, async () => {
    try {
        // Sincronizar modelos con la base de datos
        await sequelize.sync({ force: false });
        console.log('Base de datos sincronizada');
        console.log(`Servidor corriendo en puerto ${PORT}`);
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
});