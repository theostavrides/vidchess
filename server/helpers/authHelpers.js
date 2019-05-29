const bcrypt = require('bcrypt');

function authHelpers(database) {
  const dataHelpers = require('./dataHelpers.js')(database);

  const userLogin = (data) => {
    return dataHelpers.getUser(data.username).then(user => {
      if (user.length === 1) {
        if (bcrypt.compareSync(data.password, user[0].password)) {
          return true;
        } else {
          throw new Error('invalid password')
        }
      } else {
        throw new Error('invalid username')
      }
    })
  };

  const userRegister = (data) => {
    data.password = bcrypt.hashSync(data.password, 10)
    return dataHelpers.registerUser(data).catch(e => {
      if (e.code == 23505) throw new Error('username taken')
    })
  };

  return  {
    userLogin,
    userRegister
  }
}

module.exports = authHelpers;


//return