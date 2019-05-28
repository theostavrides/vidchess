exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('games').insert({id: 1, white_id: 1, black_id: 2, over: false}),
    knex('games').insert({id: 2, white_id: 2, black_id: 1, over: false}),
  ]);
};
