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
      colour: 'b',
      pieces: whiteSetup,
      username: ''
    };
    this.handleMovePiece = this.handleMovePiece.bind(this);
  }

  componentDidMount(){
    axios.get(`http://localhost:3001/rooms/${this.props.room}`, axiosOptions)
      .then(res => this.setState({roomData: res.data}))
      .then(this.setUsername)
      .then(this.setUpBoard)
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
    socket.emit('move', {fromSquare, toSquare});

    this.state.colour === 'w' ?
      game.move({ from: fromSquare, to: toSquare }) :
      game.move({ from: blackMove(fromSquare), to: blackMove(toSquare)})

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
