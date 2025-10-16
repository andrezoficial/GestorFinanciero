/**
 * @openapi
 * tags:
 *   - name: Transacciones
 *     description: Ingresos y egresos del usuario
 */
const express = require('express');
const auth = require('../middleware/auth.middleware');
const Ctrl = require('../controllers/TransaccionController');
const router = express.Router();

router.use(auth);

/**
 * @openapi
 * /api/transacciones:
 *   get:
 *     tags: [Transacciones]
 *     summary: Listar transacciones del usuario
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: query
 *         name: from
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: to
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: tipo
 *         schema: { type: string, enum: [ingreso, egreso] }
 *       - in: query
 *         name: categoria_id
 *         schema: { type: integer }
 *       - in: query
 *         name: cuenta_id
 *         schema: { type: integer }
 *       - in: query
 *         name: min
 *         schema: { type: number }
 *       - in: query
 *         name: max
 *         schema: { type: number }
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
 * /api/transacciones:
 *   post:
 *     tags: [Transacciones]
 *     summary: Crear transacción
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [tipo, monto]
 *             properties:
 *               tipo: { type: string, enum: [ingreso, egreso] }
 *               monto: { type: number }
 *               categoria_id: { type: integer }
 *               cuenta_id: { type: integer }
 *               descripcion: { type: string }
 *               fecha_transaccion: { type: string, format: date-time }
 *               estado: { type: string }
 *               comprobante_url: { type: string }
 *     responses:
 *       201: { description: Creada }
 */
router.post('/', Ctrl.create);

/**
 * @openapi
 * /api/transacciones/{id}:
 *   get:
 *     tags: [Transacciones]
 *     summary: Obtener transacción por id del usuario
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
 * /api/transacciones/{id}:
 *   put:
 *     tags: [Transacciones]
 *     summary: Actualizar transacción
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
 *               tipo: { type: string, enum: [ingreso, egreso] }
 *               monto: { type: number }
 *               categoria_id: { type: integer }
 *               cuenta_id: { type: integer }
 *               descripcion: { type: string }
 *               fecha_transaccion: { type: string, format: date-time }
 *               estado: { type: string }
 *               comprobante_url: { type: string }
 *     responses:
 *       200: { description: OK }
 *       404: { description: No encontrada }
 */
router.put('/:id', Ctrl.update);

/**
 * @openapi
 * /api/transacciones/{id}:
 *   delete:
 *     tags: [Transacciones]
 *     summary: Eliminar transacción
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
