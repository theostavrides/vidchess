const React        = require('react')
const Chess        = require('react-chess')
const ChessJS      = require('chess.js');
const chessHelpers = require('./chessHelpers/flipboard.js')
const game         = new ChessJS();

require('./board.css')

class Board extends React.PureComponent {
  constructor(props) {
    super(props);

    //initial position should be passed in as props
    this.state = {pieces: Chess.getDefaultLineup()}; // 'pieces: null' -> empty board
    this.handleMovePiece = this.handleMovePiece.bind(this);
  }

  handleMovePiece(piece, fromSquare, toSquare) {

    console.log(game.move({ from: fromSquare, to: toSquare }))

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
