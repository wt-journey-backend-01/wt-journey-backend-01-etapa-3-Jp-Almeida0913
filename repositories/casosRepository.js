const db = require('../db/db');

async function findAll(filters = {}, sort) {
  let query = db('casos').select('*');

  if (filters.titulo) {
    query = query.whereILike('titulo', `%${filters.titulo}%`);
  }

  if (filters.status) {
    query = query.where('status', filters.status);
  }

  if (filters.agente_id) {
    query = query.where('agente_id', filters.agente_id);
  }

  if (filters.q) {
    query = query.where(builder =>
      builder.whereILike('titulo', `%${filters.q}%`)
             .orWhereILike('descricao', `%${filters.q}%`)
    );
  }

  if (sort === 'asc') {
    query = query.orderBy('dataCriacao', 'asc');
  } else if (sort === 'desc') {
    query = query.orderBy('dataCriacao', 'desc');
  }

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
