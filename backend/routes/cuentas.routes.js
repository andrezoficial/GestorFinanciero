/**
 * @openapi
 * tags:
 *   - name: Cuentas
 *     description: Cuentas del usuario autenticado
 */
const express = require('express');
const auth = require('../middleware/auth.middleware');
const Ctrl = require('../controllers/CuentaController');
const router = express.Router();

router.use(auth);

/**
 * @openapi
 * /api/cuentas:
 *   get:
 *     tags: [Cuentas]
 *     summary: Listar cuentas del usuario
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: query
 *         name: tipo
 *         schema: { type: string }
 *       - in: query
 *         name: moneda
 *         schema: { type: string, example: "ARS" }
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200: { description: OK }
 */
router.get('/', Ctrl.list);

/**
 * @openapi
 * /api/cuentas:
 *   post:
 *     tags: [Cuentas]
 *     summary: Crear cuenta para el usuario actual
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, tipo]
 *             properties:
 *               nombre: { type: string }
 *               tipo: { type: string }
 *               saldo: { type: number, example: 0 }
 *               numero_cuenta: { type: string }
 *               banco: { type: string }
 *               moneda: { type: string, example: "ARS" }
 *     responses:
 *       201: { description: Creada }
 */
router.post('/', Ctrl.create);

/**
 * @openapi
 * /api/cuentas/{id}:
 *   get:
 *     tags: [Cuentas]
 *     summary: Obtener cuenta por id (solo del usuario)
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *       404: { description: No encontrada }
 */
router.get('/:id', Ctrl.getById);

/**
 * @openapi
 * /api/cuentas/{id}:
 *   put:
 *     tags: [Cuentas]
 *     summary: Actualizar cuenta
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: string }
 *               tipo: { type: string }
 *               saldo: { type: number }
 *               numero_cuenta: { type: string }
 *               banco: { type: string }
 *               moneda: { type: string }
 *     responses:
 *       200: { description: OK }
 *       404: { description: No encontrada }
 */
router.put('/:id', Ctrl.update);

/**
 * @openapi
 * /api/cuentas/{id}:
 *   delete:
 *     tags: [Cuentas]
 *     summary: Eliminar cuenta
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Eliminada }
 *       404: { description: No encontrada }
 */
router.delete('/:id', Ctrl.remove);

module.exports = router;
