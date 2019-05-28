exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('games').insert({id: 1, white_id: 1, black_id: 2, over: true}),
    knex('games').insert({id: 2, white_id: 2, black_id: 1, over: true}),
    knex('games').insert({id: 3, white_id: 2, black_id: 3, over: false}),
    knex('games').insert({id: 4, white_id: 3, black_id: 4, over: false}),
  ]);
};
