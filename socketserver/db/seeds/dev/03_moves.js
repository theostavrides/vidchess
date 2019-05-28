exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('moves').insert({id: 1, game_id: 1, move: 'Pe4'}),
    knex('moves').insert({id: 2, game_id: 1, move: 'pd6'}),
    knex('moves').insert({id: 3, game_id: 1, move: 'Pd4'}),
    knex('moves').insert({id: 4, game_id: 1, move: 'nf6'}),
    knex('moves').insert({id: 5, game_id: 1, move: 'Nc3'}),
    knex('moves').insert({id: 6, game_id: 1, move: 'pg6'}),
    knex('moves').insert({id: 7, game_id: 1, move: 'Be3'}),
    knex('moves').insert({id: 8, game_id: 1, move: 'bg7'}),

    knex('moves').insert({id: 9,  game_id: 2, move: 'Pd4'}),
    knex('moves').insert({id: 10, game_id: 2, move: 'pd5'}),
    knex('moves').insert({id: 11, game_id: 2, move: 'Pc4'}),
    knex('moves').insert({id: 12, game_id: 2, move: 'pc5'}),
    knex('moves').insert({id: 13, game_id: 2, move: 'Pe4'}),
    knex('moves').insert({id: 14, game_id: 2, move: 'pe5'}),
    knex('moves').insert({id: 15, game_id: 2, move: 'Pa4'}),
    knex('moves').insert({id: 16, game_id: 2, move: 'pa5'}),

    knex('moves').insert({id: 17, game_id: 3, move: 'Pd3'}),
    knex('moves').insert({id: 18, game_id: 3, move: 'pd5'}),
    knex('moves').insert({id: 19, game_id: 3, move: 'Pc3'}),
    knex('moves').insert({id: 20, game_id: 3, move: 'pc5'}),
    knex('moves').insert({id: 21, game_id: 3, move: 'Pe3'}),
    knex('moves').insert({id: 22, game_id: 3, move: 'pe5'}),
    knex('moves').insert({id: 23, game_id: 3, move: 'Pa3'}),
    knex('moves').insert({id: 24, game_id: 3, move: 'pa5'}),

    knex('moves').insert({id: 25, game_id: 4, move: 'Pd3'}),
    knex('moves').insert({id: 26, game_id: 4, move: 'pd6'}),
    knex('moves').insert({id: 27, game_id: 4, move: 'Pc3'}),
    knex('moves').insert({id: 28, game_id: 4, move: 'pc6'}),
    knex('moves').insert({id: 29, game_id: 4, move: 'Pe3'}),
    knex('moves').insert({id: 30, game_id: 4, move: 'pe6'}),
    knex('moves').insert({id: 31, game_id: 4, move: 'Pa3'}),
    knex('moves').insert({id: 32, game_id: 4, move: 'pa6'})
  ]);
};
