const express = require('express');
const cors = require('cors');
const sequelize = require('./connection/db/db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    sequelize.authenticate()
        .then(() => console.log('Base de datos conectada'))
        .catch(error => console.error('Error al conectar la base de datos:', error));
});