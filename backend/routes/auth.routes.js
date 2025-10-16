const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registro de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, apellido, email, password]
 *             properties:
 *               nombre: { type: string }
 *               apellido: { type: string }
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *     responses:
 *       201: { description: Creado }
 *       409: { description: Email ya registrado }
 */
router.post('/register', async (req, res) => {
  try {
    const out = await AuthController.register(req.body);
    res.status(201).json(out);
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }
    res.status(400).json({ message: e.message });
  }
});

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *     responses:
 *       200: { description: OK }
 *       401: { description: Credenciales inválidas }
 */
router.post('/login', async (req, res) => {
  try {
    const out = await AuthController.login(req.body.email, req.body.password);
    res.json(out);
  } catch (e) {
    const status = /no encontrado|incorrecta/i.test(e.message) ? 401 : 400;
    res.status(status).json({ message: 'Credenciales inválidas' });
  }
});

module.exports = router;
