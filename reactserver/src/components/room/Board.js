const React                                    = require('react')
const Chess                                    = require('react-chess')
const ChessJS                                  = require('chess.js');
const { blackMove, whiteSetup, blackSetup }    = require('../../helpers/chessHelpers.js')
const game                                     = new ChessJS();
const axios = require('axios')
const axiosOptions = {
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "http://localhost:3000"
  },
  withCredentials: true
}

require('./Board.css')


class Board extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      roomData: {},
      gameData: {},
      color: 'b',
      pieces: whiteSetup,
      username: '',
      game: new ChessJS(),

    };
    this.handleMovePiece = this.handleMovePiece.bind(this);
  }

  componentDidMount(){
    axios.get(`http://localhost:3001/rooms/${this.props.room}`, axiosOptions)
      .then(res => this.setState({roomData: res.data}))
      .then(this.setUsername)
      .then(this.setGameData)
      .then(this.setUpBoard)
    this.props.socket.on("move", (data) => {
      this.props.handleTimer('other players move valid, change timer', data)
      let { fromSquare, toSquare } = data;

      if (this.state.color === 'b') {
        this.state.game.move( {from: blackMove(fromSquare), to: blackMove(toSquare)} )
      }
      if (this.state.color === 'w') {
        this.state.game.move( {from: fromSquare, to: toSquare} )
      }
      let { color, piece } = data.lastMove;
      if (color === 'w') piece = piece.toUpperCase();
      if (color === 'b') piece = piece.toLowerCase();
      let newPiece = `${piece}@${toSquare}`

      let boardIfCapture = this.state.pieces.filter(e => e.split('@')[1] !== toSquare).filter(e => e.split('@')[1] !== fromSquare)

      boardIfCapture.push(newPiece)
      this.setState({pieces: boardIfCapture})

      this.handleDraw();
      this.handleCheckmate();
      this.handleResignation();
      this.handleDrawRequest();
    })

    this.props.socket.on("gameOver", (data) => {
      this.props.setRematch(data)
    })
  }

  handleCheckmate = () => {
    console.log(this.state)
    if (this.state.game.in_checkmate()) {
      this.props.socket.emit('checkmate', this.state)
    }
  };
  handleResignation = () => {

  };

  handleDraw = () => {}

  handleDrawRequest = () => {};

  setGameData = () => {
    let gameid = this.state.roomData.current_game;
    if (gameid) {
      axios.get(`http://localhost:3001/games/${gameid}`, axiosOptions)
        .then((res) => this.setState({gameData: res.data}))
    }
  }

  setUpBoard = () => {
    const { id, creator, creator_victories, current_game, games_completed,
      start_color, time_per_move, timestamp, url } = this.state.roomData;
    const username = this.state.username;
    let currentColor;

    if (username === creator) {
      if (games_completed % 2 === 0) {
        currentColor = start_color;
      } else {
        currentColor = start_color === 'w' ? 'b' : 'w'
      }
    } else {
      if (games_completed % 2 === 0) {
        currentColor = start_color === 'w' ? 'b' : 'w'
      } else {
        currentColor = start_color;
      }
    }

    if (currentColor === 'w') {
      this.setState({color:'w'})
      this.setState({pieces: whiteSetup})
    } else {
      this.setState({color:'b'});
      this.setState({pieces: blackSetup})
    }
  }

  setUsername = () => {
    return axios.get('http://localhost:3001/auth', axiosOptions)
      .then((res) => {this.setState({username: res.data})})
  }

  handleMovePiece(piece, fromSquare, toSquare) {
    const socket = this.props.socket;
    const oldPieces = this.state.pieces;
    let validMove = this.state.color === 'w' ?
      this.state.game.move({from: fromSquare, to: toSquare}) :
      this.state.game.move({from: blackMove(fromSquare), to: blackMove(toSquare)})


    if (validMove) {
      this.props.handleTimer('handle my own timer')
      let history = this.state.game.history({ verbose: true });
      let lastMove = history.pop();

      this.state.color === 'w' ?
        socket.emit('move', {fromSquare: blackMove(fromSquare), toSquare: blackMove(toSquare), lastMove, state: this.state}) :
        socket.emit('move', {fromSquare: blackMove(fromSquare), toSquare: blackMove(toSquare), lastMove, state: this.state});


      const newPieces = this.state.pieces
        .map((curr, index) => {
          if (piece.index === index) {
            return `${piece.name}@${toSquare}`
          } else if (curr.indexOf(toSquare) === 2) {
            return false // To be removed from the board
          }
          return curr
        })
        .filter(Boolean)

      this.setState({pieces: newPieces})
    } else {
      //reset board if move invalid
      this.setState({pieces: []})
      this.setState({pieces: oldPieces})
    }
  }



  render() {
    const {pieces} = this.state
    return (
      <div className="board">
        <Chess pieces={pieces} onMovePiece={this.handleMovePiece} />
      </div>
    )
  }
}

module.exports = Board
