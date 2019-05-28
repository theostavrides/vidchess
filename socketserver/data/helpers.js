function makeHelpers(knex) {
  const getAllUsers = () => {
    return knex("users")
      .select("*")
      .then((id) => {
        return Promise.resolve(id);
    })
  }
  const getAllGames = () => {
    return knex("games")
      .select("*")
      .then((id) => {
        return Promise.resolve(id);
    })
  }
  const getAllMoves = () => {
    return knex("games")
      .select("*")
      .then((id) => {
        return Promise.resolve(id);
    })
  }
  const getGame = (game_id) => {
    return knex("games")
      .select("*")
      .where('id', id)
      .then((id) => {
        return Promise.resolve(id);
      })
  }
  const getUser = (user_id) => {
    return knex("users")
      .select("*")
      .where('id', id)
      .then((id) => {
        return Promise.resolve(id);
      })
  }
  const getGamesOfUser = (user_id) => {
    return knex("games")
      .select("*")
      .where("white_id", user_id)
      .orWhere("black_id", user_id)
      .orderBy("id")
      .then((id) => {
        return Promise.resolve(id)
      })
  }
  const getMovesOfGame = (game_id) => {
    return knex("moves")
      .select("*")
      .where('game_id', game_id)
      .orderBy('id')
      .then((id) => {
        return Promise.resolve(id);
      })
  }

  return  {
    getAllGames,
    getAllUsers,
    getAllMoves,
    getUser,
    getGame,
    getGamesOfUser,
    getMovesOfGame
  }
}

module.exports = makeHelpers;
