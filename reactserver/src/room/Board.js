const React                                    = require('react')
const Chess                                    = require('react-chess')
const ChessJS                                  = require('chess.js');
const { blackMove, whiteSetup, blackSetup }    = require('../helpers/chessHelpers.js')
const game                                     = new ChessJS();

require('./Board.css')

class Board extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      colour: 'b',
      pieces: blackSetup
    };
    this.handleMovePiece = this.handleMovePiece.bind(this);
  }

  handleMovePiece(piece, fromSquare, toSquare) {
    this.state.colour === 'w' ?
      game.move({ from: fromSquare, to: toSquare }) :
      game.move({ from: blackMove(fromSquare), to: blackMove(toSquare)})
    console.log(game.history())
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
