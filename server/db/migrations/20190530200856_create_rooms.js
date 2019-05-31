
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('rooms', (table) => {
      table.increments().primary();

      table.string('creator').unsigned();
      table.foreign('creator').references('username').inTable('users')

      table.integer('games_completed');
      table.integer('creator_victories');

      table.integer('current_game').unsigned();
      table.foreign('current_game').references('id').inTable('games');

      table.string('url');
      table.integer('time_per_move');
      table.string('start_color');
      table.timestamp('timestamp').defaultTo(knex.fn.now());
    })
  ])
};

exports.down = function(knex, Promise) {
  if(knex.schema.hasTable('rooms')) {
    return Promise.all([
      knex.schema.dropTable('rooms')
    ])
  }
};
