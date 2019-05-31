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
  const newGame = (data) => {
    return knex('games').insert(data)
    }
  const getUser = (username) => {
    return knex("users")
      .select("*")
      .where('username', username)
  }
  const getUserId = (username) => {
    return knex("users")
      .select("id")
      .where("username", username)
  }
  const getGamesOfUser = (user_id) => {
    return knex("games")
      .where("white_id", user_id)
      .orWhere("black_id", user_id)
      .select("*")
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
  const registerUser = (data) => {
    return knex("users").insert(data)
  }

  const newRoom = (data) => {
    return knex('rooms').insert(data);
  }

  const getRoomData = (url) => {
    return knex("rooms")
      .select("*")
      .where("url", url)
  }

  const newGameAndRoom = (data) => {
    let gameData = { white_id: null, black_id: null, result: null }
    let roomData = data;
    return getUserId(data.creator)
      .then(res => {
        const userid = res[0].id;
        data.start_color === 'w' ? gameData.white_id = userid : null;
        data.start_color === 'b' ? gameData.black_id = userid: null;
      }).then(() => newGame(gameData).returning('id'))
      .then((id) => { roomData.current_game = id[0]; return roomData })
      .then(newRoom)
  }

  return  {
    getAllGames,
    getAllUsers,
    getAllMoves,
    getUser,
    getGame,
    getGamesOfUser,
    getMovesOfGame,
    registerUser,
    newRoom,
    getRoomData,
    getUserId,
    newGame,
    newGameAndRoom
  }
}

module.exports = makeHelpers;
