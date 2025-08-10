exports.seed = async function(knex) {
  await knex('casos').del();

  await knex('casos').insert([
    { id: 1, titulo: 'homicidio', descricao: 'Disparos reportados no bairro União', status: 'aberto', agente_id: 1, dataCriacao: '2025-07-21T15:30:00Z' },
    { id: 2, titulo: 'roubo', descricao: 'Roubo em estabelecimento comercial', status: 'solucionado', agente_id: 2, dataCriacao: '2025-07-22T10:00:00Z' },
  ]);
};