const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Ruta de registro
router.post('/register', async (req, res) => {
    try {
        const resultado = await AuthController.register(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta de login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const resultado = await AuthController.login(email, password);
        res.json(resultado);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;