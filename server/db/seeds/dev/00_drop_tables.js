exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').del(),
    knex('games').del(),
    knex('moves').del(),
    knex('rooms').del()
  ])
};