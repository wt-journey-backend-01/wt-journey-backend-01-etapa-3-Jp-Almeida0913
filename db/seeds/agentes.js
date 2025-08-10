exports.seed = async function(knex) {
  await knex('casos').del().catch(() => {});
  await knex('agentes').del();

  await knex('agentes').insert([
    { id: 1, nome: 'Rommel Carneiro', dataDeIncorporacao: '1992-10-04', cargo: 'delegado' },
    { id: 2, nome: 'Ana Silva', dataDeIncorporacao: '2010-05-12', cargo: 'inspetor' },
  ]);
};