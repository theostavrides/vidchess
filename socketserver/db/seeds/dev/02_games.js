exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('games').insert({id: 1, white_id: 1, black_id: 2}),
    knex('games').insert({id: 2, white_id: 2, black_id: 1}),
    knex('games').insert({id: 3, white_id: 2, black_id: 3, result: 'w'}),
    knex('games').insert({id: 4, white_id: 3, black_id: 4, result: 'b'}),
  ]);
};
