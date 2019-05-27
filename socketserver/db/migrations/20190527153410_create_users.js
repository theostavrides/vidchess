exports.up = function(knex, Promise) { // eslint-disable-line no-unused-vars
  return knex.schema.createTable('users', function (table) {
    table.increments().primary();
    table.string('username').unique();
    table.string('email');
    table.string('password');
    table.string('avatar');
  });
};

exports.down = function(knex, Promise) { // eslint-disable-line no-unused-vars
  return knex.schema.dropTable('users');
};
