exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('moves', (table) => {
      table.increments().primary();
      table.integer('game_id').unsigned();
      table.foreign('game_id').references('id').inTable('games');
      table.string('move').notNullable();
      table.timestamp('timestamp').defaultTo(knex.fn.now());
    })
  ])
};

exports.down = function(knex, Promise) {
  if(knex.schema.hasTable('moves')) {
    return Promise.all([
      knex.schema.dropTable('moves')
    ])
  }
};
