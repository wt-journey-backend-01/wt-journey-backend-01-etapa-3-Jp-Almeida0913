const db = require('../db/db');

async function findAll(filters = {}) {
  const query = db('casos').select('*');
  if (filters.agente_id) query.where({ agente_id: filters.agente_id });
  if (filters.status) query.where({ status: filters.status });
  return query;
}

async function findById(id) {
  return db('casos').where({ id }).first();
}

async function create(caso) {
  const [newId] = await db('casos').insert(caso).returning('id');
  return findById(newId);
}

async function update(id, dados) {
  await db('casos').where({ id }).update(dados);
  return findById(id);
}

async function remove(id) {
  return db('casos').where({ id }).del();
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
