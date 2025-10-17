/**
 * @openapi
 * tags:
 *   - name: Presupuestos
 *     description: Gestión de presupuestos por categoría
 */

const express = require('express');
const auth = require('../middleware/auth.middleware');
const Ctrl = require('../controllers/PresupuestoController');
const router = express.Router();

router.use(auth);

/**
 * @openapi
 * /api/presupuestos:
 *   get:
 *     tags: [Presupuestos]
 *     summary: Listar presupuestos del usuario
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: query
 *         name: periodo
 *         schema: { type: string, enum: [diario, semanal, mensual, anual] }
 *       - in: query
 *         name: categoria_id
 *         schema: { type: integer }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200: 
 *         description: Lista de presupuestos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 meta:
 *                   type: object
 */
router.get('/', Ctrl.list);

/**
 * @openapi
 * /api/presupuestos/resumen:
 *   get:
 *     tags: [Presupuestos]
 *     summary: Obtener resumen de presupuestos activos con estadísticas
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Resumen de presupuestos activos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 presupuestos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: integer }
 *                       categoria_id: { type: integer }
 *                       monto_limite: { type: number }
 *                       periodo: { type: string }
 *                       fecha_inicio: { type: string, format: date-time }
 *                       fecha_fin: { type: string, format: date-time }
 *                       Categoria: { type: object }
 *                       estadisticas:
 *                         type: object
 *                         properties:
 *                           gasto_real: { type: number }
 *                           disponible: { type: number }
 *                           porcentaje_usado: { type: number }
 *                           estado: { type: string, enum: [normal, advertencia, alerta, excedido] }
 *                 resumen_general:
 *                   type: object
 *                   properties:
 *                     total_presupuestos: { type: integer }
 *                     total_limite: { type: number }
 *                     total_gastado: { type: number }
 *                     total_disponible: { type: number }
 *                     presupuestos_excedidos: { type: integer }
 *                     presupuestos_en_alerta: { type: integer }
 */
router.get('/resumen', Ctrl.getResumenPresupuestos);

/**
 * @openapi
 * /api/presupuestos:
 *   post:
 *     tags: [Presupuestos]
 *     summary: Crear un nuevo presupuesto
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [categoria_id, monto_limite, periodo, fecha_inicio, fecha_fin]
 *             properties:
 *               categoria_id: 
 *                 type: integer
 *                 description: ID de la categoría a presupuestar
 *               monto_limite: 
 *                 type: number
 *                 description: Límite de gasto para el período
 *                 example: 50000
 *               periodo: 
 *                 type: string
 *                 enum: [diario, semanal, mensual, anual]
 *                 description: Tipo de período del presupuesto
 *               fecha_inicio: 
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio del presupuesto
 *                 example: "2025-01-01"
 *               fecha_fin: 
 *                 type: string
 *                 format: date
 *                 description: Fecha de fin del presupuesto
 *                 example: "2025-01-31"
 *     responses:
 *       201: 
 *         description: Presupuesto creado exitosamente
 *       400: 
 *         description: Datos inválidos
 */
router.post('/', Ctrl.create);

/**
 * @openapi
 * /api/presupuestos/{id}:
 *   get:
 *     tags: [Presupuestos]
 *     summary: Obtener un presupuesto por ID
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Presupuesto encontrado }
 *       404: { description: Presupuesto no encontrado }
 */
router.get('/:id', Ctrl.getById);

/**
 * @openapi
 * /api/presupuestos/{id}/estado:
 *   get:
 *     tags: [Presupuestos]
 *     summary: Obtener el estado actual de un presupuesto (gasto vs límite)
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Estado del presupuesto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 presupuesto: { type: object }
 *                 estadisticas:
 *                   type: object
 *                   properties:
 *                     monto_limite: { type: number }
 *                     gasto_real: { type: number }
 *                     disponible: { type: number }
 *                     porcentaje_usado: { type: number }
 *                     estado: { type: string, enum: [normal, advertencia, alerta, excedido] }
 *                     dias_restantes: { type: integer }
 *       404: { description: Presupuesto no encontrado }
 */
router.get('/:id/estado', Ctrl.getEstadoPresupuesto);

/**
 * @openapi
 * /api/presupuestos/{id}:
 *   put:
 *     tags: [Presupuestos]
 *     summary: Actualizar un presupuesto
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
 *               categoria_id: { type: integer }
 *               monto_limite: { type: number }
 *               periodo: { type: string, enum: [diario, semanal, mensual, anual] }
 *               fecha_inicio: { type: string, format: date }
 *               fecha_fin: { type: string, format: date }
 *     responses:
 *       200: { description: Presupuesto actualizado }
 *       404: { description: Presupuesto no encontrado }
 */
router.put('/:id', Ctrl.update);

/**
 * @openapi
 * /api/presupuestos/{id}:
 *   delete:
 *     tags: [Presupuestos]
 *     summary: Eliminar un presupuesto
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Presupuesto eliminado }
 *       404: { description: Presupuesto no encontrado }
 */
router.delete('/:id', Ctrl.remove);

module.exports = router;
