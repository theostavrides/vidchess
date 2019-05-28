exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('moves').insert({id: 1, game_id: 1, move: 'Pe4'}),
    knex('moves').insert({id: 2, game_id: 1, move: 'pe5'})
  ]);
};
