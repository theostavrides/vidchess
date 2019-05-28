exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').insert({id: 1, username:'theo', password:'chicken', email:'theostavrides@gmail.com', avatar:'haha.jpg'}),
    knex('users').insert({id: 2, username:'tom', password:'chicken', email:'tom@gmail.com', avatar:'lol.jpg'}),
    knex('users').insert({id: 3, username:'murat', password:'chicken', email:'murat@gmail.com', avatar:'boi.jpg'}),
    knex('users').insert({id: 4, username:'chad', password:'chicken', email:'chad@gmail.com', avatar:'lolll.jpg'})
  ]);
};
