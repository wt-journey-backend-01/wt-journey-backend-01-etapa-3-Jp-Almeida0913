const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Caso:
 *       type: object
 *       required:
 *         - titulo
 *         - descricao
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do caso
 *         titulo:
 *           type: string
 *           description: Título do caso
 *         descricao:
 *           type: string
 *           description: Descrição detalhada do caso
 *         status:
 *           type: string
 *           description: "Status atual do caso (ex: aberto, em andamento, fechado)"
 *         tipo:
 *           type: string
 *           description: Tipo do caso
 *         dataCriacao:
 *           type: string
 *           format: date-time
 *           description: Data de criação do caso
 *       example:
 *         id: "1"
 *         titulo: "Investigação de fraude"
 *         descricao: "Relato de fraude financeira em andamento."
 *         status: "aberto"
 *         tipo: "financeiro"
 *         dataCriacao: "2025-07-21T15:30:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Casos
 *   description: Endpoints para gerenciamento de casos
 */

/**
 * @swagger
 * /casos:
 *   get:
 *     summary: Retorna todos os casos ou realiza uma busca com filtros
 *     tags: [Casos]
 *     parameters:
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *         description: Tipo do caso
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Status do caso
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Campo para ordenação (asc/desc)
 *     responses:
 *       200:
 *         description: Lista de casos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Caso'
 */
router.get('/casos', casosController.getCasos);

/**
 * @swagger
 * /casos/{id}:
 *   get:
 *     summary: Retorna um caso específico por ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do caso
 *     responses:
 *       200:
 *         description: Caso encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 *       404:
 *         description: Caso não encontrado
 */
router.get('/casos/:id', casosController.getCasosById);

/**
 * @swagger
 * /casos:
 *   post:
 *     summary: Cria um novo caso
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       201:
 *         description: Caso criado com sucesso
 */
router.post('/casos', casosController.createCaso);

/**
 * @swagger
 * /casos/{id}:
 *   put:
 *     summary: Atualiza completamente um caso pelo ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso
 *       404:
 *         description: Caso não encontrado
 */
router.put('/casos/:id', casosController.atualizarCaso);

/**
 * @swagger
 * /casos/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um caso pelo ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Caso atualizado parcialmente com sucesso
 *       404:
 *         description: Caso não encontrado
 */
router.patch('/casos/:id', casosController.atualizarParcialCaso);

/**
 * @swagger
 * /casos/{id}:
 *   delete:
 *     summary: Remove um caso pelo ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do caso
 *     responses:
 *       200:
 *         description: Caso removido com sucesso
 *       404:
 *         description: Caso não encontrado
 */
router.delete('/casos/:id', casosController.deletarCaso);

module.exports = router;