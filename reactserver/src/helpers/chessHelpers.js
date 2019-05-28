let conversions = { a: 'h', b: 'g', c: 'f', d: 'e', e: 'd', f: 'c', g: 'b', h: 'a',
                    1: 8, 2: 7, 3: 6, 4: 5, 5: 4, 6: 3, 7: 2, 8: 1 }

let whiteSetup = ["R@a1", "P@a2", "p@a7", "r@a8", "N@b1", "P@b2", "p@b7", "n@b8",
                  "B@c1", "P@c2", "p@c7", "b@c8", "Q@d1", "P@d2", "p@d7", "q@d8",
                  "K@e1", "P@e2", "p@e7", "k@e8", "B@f1", "P@f2", "p@f7", "b@f8",
                  "N@g1", "P@g2", "p@g7", "n@g8", "R@h1", "P@h2", "p@h7", "r@h8"];

let blackSetup = ["R@h8", "P@h7", "p@h2", "r@h1", "N@g8", "P@g7", "p@g2", "n@g1",
                  "B@f8", "P@f7", "p@f2", "b@f1", "Q@e8", "P@e7", "p@e2", "q@e1",
                  "K@d8", "P@d7", "p@d2", "k@d1", "B@c8", "P@c7", "p@c2", "b@c1",
                  "N@b8", "P@b7", "p@b2", "n@b1", "R@a8", "P@a7", "p@a2", "r@a1"];

//converts square to black's perspective (a1 -> h8)
function blackMove(square) {
  const rank = square[1];
  const file = square[0];
  const flipped = conversions[file] + conversions[rank];
  return flipped;
}

function flipPiece(piece) {
  const [first, last] = piece.split('@');
  const flipped = blackMove(last)
  return [first, flipped].join('@')
}



export {
  blackMove,
  whiteSetup,
  blackSetup
}