
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('games', (table) => {
      table.increments();
      table.date('created').notNullable();
      table.integer('white').unsigned();
      table.integer('black').unsigned();
      table.foreign('white').references('id').inTable('users');
      table.foreign('black').references('id').inTable('users');
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
