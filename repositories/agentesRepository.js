const db = require('../db/db');

async function findAll() {
  return db('agentes').select('*');
}

async function findById(id) {
  return db('agentes').where({ id }).first();
}

async function create(agente) {
  // agente: { nome, dataDeIncorporacao, cargo }
  const [newId] = await db('agentes').insert(agente).returning('id');
  return findById(newId);
}

async function update(id, dados) {
  await db('agentes').where({ id }).update(dados);
  return findById(id);
}

async function remove(id) {
  return db('agentes').where({ id }).del();
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
