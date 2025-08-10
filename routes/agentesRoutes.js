const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Agente:
 *       type: object
 *       required:
 *         - nome
 *         - cargo
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do agente
 *         nome:
 *           type: string
 *           description: Nome do agente
 *         cargo:
 *           type: string
 *           description: Cargo ou função do agente
 *       example:
 *         id: "123"
 *         nome: "João Silva"
 *         cargo: "Investigador"
 */


/**
 * @swagger
 * tags:
 *   name: Agentes
 *   description: Endpoints para gerenciamento de agentes
 */

/**
 * @swagger
 * /agentes:
 *   get:
 *     summary: Retorna todos os agentes ou realiza uma busca com filtros
 *     tags: [Agentes]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome do agente para filtrar
 *     responses:
 *       200:
 *         description: Lista de agentes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agente'
 */
router.get('/agentes', agentesController.getAgentes);

/**
 * @swagger
 * /agentes/{id}:
 *   get:
 *     summary: Retorna um agente específico pelo ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do agente
 *     responses:
 *       200:
 *         description: Agente encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *       404:
 *         description: Agente não encontrado
 */
router.get('/agentes/:id', agentesController.getAgenteById);

/**
 * @swagger
 * /agentes:
 *   post:
 *     summary: Cria um novo agente
 *     tags: [Agentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agente'
 *     responses:
 *       201:
 *         description: Agente criado com sucesso
 */
router.post('/agentes', agentesController.createAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   put:
 *     summary: Atualiza completamente um agente pelo ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do agente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agente'
 *     responses:
 *       200:
 *         description: Agente atualizado com sucesso
 *       404:
 *         description: Agente não encontrado
 */
router.put('/agentes/:id', agentesController.atualizarAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um agente pelo ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do agente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Agente atualizado parcialmente com sucesso
 *       404:
 *         description: Agente não encontrado
 */
router.patch('/agentes/:id', agentesController.atualizarParcialAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   delete:
 *     summary: Remove um agente pelo ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do agente
 *     responses:
 *       200:
 *         description: Agente removido com sucesso
 *       404:
 *         description: Agente não encontrado
 */
router.delete('/agentes/:id', agentesController.deletarAgente);

router.get('/agentes/:id/casos', agentesController.getCasosDoAgente);


module.exports = router;