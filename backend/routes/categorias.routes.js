/**
 * @openapi
 * tags:
 *   - name: Categorias
 *     description: CRUD de categorías (globales)
 */

const express = require('express');
const auth = require('../middleware/auth.middleware');
const Ctrl = require('../controllers/CategoriaController');
const router = express.Router();

router.use(auth);

/**
 * @openapi
 * /api/categorias:
 *   get:
 *     tags: [Categorias]
 *     summary: Listar categorías
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: query
 *         name: tipo
 *         schema: { type: string, enum: [ingreso, egreso] }
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: sort
 *         schema: { type: string, default: id }
 *       - in: query
 *         name: order
 *         schema: { type: string, enum: [ASC, DESC], default: ASC }
 *     responses:
 *       200: { description: OK }
 */
router.get('/', Ctrl.list);

/**
 * @openapi
 * /api/categorias:
 *   post:
 *     tags: [Categorias]
 *     summary: Crear categoría
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
 *               tipo: { type: string, enum: [ingreso, egreso] }
 *               descripcion: { type: string }
 *               color: { type: string, example: "#16a34a" }
 *               icono: { type: string, example: "wallet" }
 *     responses:
 *       201: { description: Creada }
 */
router.post('/', Ctrl.create);

/**
 * @openapi
 * /api/categorias/{id}:
 *   get:
 *     tags: [Categorias]
 *     summary: Obtener categoría por id
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
 * /api/categorias/{id}:
 *   put:
 *     tags: [Categorias]
 *     summary: Actualizar categoría
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
 *               tipo: { type: string, enum: [ingreso, egreso] }
 *               descripcion: { type: string }
 *               color: { type: string }
 *               icono: { type: string }
 *     responses:
 *       200: { description: OK }
 *       404: { description: No encontrada }
 */
router.put('/:id', Ctrl.update);

/**
 * @openapi
 * /api/categorias/{id}:
 *   delete:
 *     tags: [Categorias]
 *     summary: Eliminar categoría
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
