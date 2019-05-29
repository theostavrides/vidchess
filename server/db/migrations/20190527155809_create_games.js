
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('games', (table) => {
      table.increments().primary();
      table.string('result');
      table.integer('white_id').unsigned();
      table.integer('black_id').unsigned();
      table.foreign('white_id').references('id').inTable('users');
      table.foreign('black_id').references('id').inTable('users');
      table.timestamp('timestamp').defaultTo(knex.fn.now());
    })
  ])
};

exports.down = function(knex, Promise) {
  if(knex.schema.hasTable('games')) {
    return Promise.all([
      knex.schema.dropTable('games')
    ])
  }
};
