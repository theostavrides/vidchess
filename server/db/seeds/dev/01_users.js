const bcrypt = require('bcrypt');
exports.seed = function(knex, Promise) {
  let p1 = bcrypt.hashSync("chicken", 10)
  return Promise.all([
    knex('users').insert({id: 1, username:'theo', password: p1, email:'theostavrides@gmail.com', avatar:'haha.jpg'}),
    knex('users').insert({id: 2, username:'tom', password: p1, email:'tom@gmail.com', avatar:'lol.jpg'}),
    knex('users').insert({id: 3, username:'murat', password: p1, email:'murat@gmail.com', avatar:'boi.jpg'}),
    knex('users').insert({id: 4, username:'chad', password: p1, email:'chad@gmail.com', avatar:'lolll.jpg'})
  ]);
};
