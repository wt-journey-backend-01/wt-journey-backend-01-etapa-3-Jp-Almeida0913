const db = require('../db/db');

async function findAll(filters = {}, sort) {
  let query = db('agentes').select('*');

  if (filters.cargo) {
    query = query.where('cargo', filters.cargo);
  }

  if (sort === 'asc') {
    query = query.orderBy('dataDeIncorporacao', 'asc');
  } else if (sort === 'desc') {
    query = query.orderBy('dataDeIncorporacao', 'desc');
  }

  return query;
}

async function findById(id) {
  return db('agentes').where({ id }).first();
}

async function create(agente) {
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
