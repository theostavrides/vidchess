
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').insert({id: 1, username:'theo', password:'chicken', email:'theostavrides@gmail.com', avatar:'haha.jpg'}),
    knex('users').insert({id: 2, username:'tom', password:'chicken', email:'tom@gmail.com', avatar:'lol.jpg'})
  ]);
};
