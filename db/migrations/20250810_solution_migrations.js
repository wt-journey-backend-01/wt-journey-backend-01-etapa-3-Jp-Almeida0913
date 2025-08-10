exports.up = function(knex) {
  return knex.schema
    .createTable('agentes', table => {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.date('dataDeIncorporacao').notNullable();
      table.string('cargo').notNullable();
    })
    .createTable('casos', table => {
      table.increments('id').primary();
      table.string('titulo').notNullable();
      table.text('descricao').notNullable();
      table.enu('status', ['aberto', 'solucionado']).notNullable().defaultTo('aberto');
      table.integer('agente_id').unsigned().notNullable()
        .references('id').inTable('agentes').onDelete('CASCADE');
      table.timestamp('dataCriacao').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('casos')
    .dropTableIfExists('agentes');
};