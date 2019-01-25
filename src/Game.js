import React from 'react';
import Board from './Board';

let BoardSize = 9;

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(BoardSize * BoardSize).fill(null),
        }, ],
        winnerHistory: [],
        currentStepNumber: 0,
        sIsNext: true,
        score: 0,
        winningLines: [],
        BoardSize: 9,
        currentRow: 0,
        currentColumn: 0,
        Player1Score: 0,
        Player2Score: 0,
        SisNext2: true,
        scoredLines: []
      };
    }
    
calculateWinner = (squares, row, col) => {
var box = this.listToMatrix(squares, BoardSize);

  if (row > 0 && col > 0 && row < BoardSize - 1 && col < BoardSize - 1) {
    for(let c=col-1;c<col+2; c++){
      for(let r=row-1; r<row+2; r++){
        if(r > 0 && c>0 && r<BoardSize-1 && c<BoardSize-1)
          if(box[r][c]==='O'){
            console.log('r: ' + r + ' c: '+ c);
            this.calculateAllSide(box, r, c);
          }
      }
    }
  }

else{
  console.log('row2: [' + row + '] col2: [' + col + ']');
}

// return { winner: squares[a], winnerRow: lines[i] };
// return {winner: box[row][col], winnerRow: }
  return { winner: null, winnerRow: null };
};
listToMatrix(list, elementsPerSubarray) {
  var matrix = [], i, k;

  for (i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubarray === 0) {
      k++;
      matrix[k] = [];
    }

    matrix[k].push(list[i]);
  }
  return matrix;
}

Score(sIsWinner) {
  if (sIsWinner) {
    this.state.Player1Score += 1;
  } else {
    this.state.Player2Score += 1;
  }
}

// winningLines function - check if the 
checkScoredLines(first, second){

  console.log('first ' + first + " second " + second)

  if(this.state.scoredLines.length === 0){
    console.log('false');
    return false
  }
  console.log('length ' + this.state.scoredLines.length)

  for (let i = 0; i < this.state.scoredLines.length; i++) {
    console.log('all scored: ' + this.state.scoredLines);
    console.log('scored: ' + this.state.scoredLines[i] + ' , ' + this.state.scoredLines[i+1]);
    if (this.state.scoredLines[i][0] === first && this.state.scoredLines[i][1] === second) {
      console.log('tin yang ikit')
      console.log('if scored' + this.state.scoredLines[i][0] + ' ' + this.state.scoredLines[i][1]);
      console.log('first2 ' + first + 'second2 '+ second )
      
      return true
    }
  }

  return false
}
// checkLines(row1,col1,row2,col2){

// }
calculateAllSide(box, row, col) {
  if (box[row - 1][col + 1] === 'S' && box[row + 1][col - 1] === 'S') {
    if (!this.checkScoredLines(((row - 1) + '' + (col+1)), (row + 1) +''+ (col-1))) {
      console.log('Slant right SOS');
      this.state.scoredLines.push([(row - 1) + '' + (col + 1), (row + 1) + '' + (col - 1)])
      this.Score(this.state.SisNext2);
    }
  }
  if (box[row - 1][col - 1] === 'S' && box[row + 1][col + 1] === 'S') {

    if (!this.checkScoredLines(((row - 1) + '' + (col-1)), (row + 1) +''+ (col+1))) {
      console.log('Slant Left SOS');
      this.state.scoredLines.push([(row - 1) + '' + (col - 1), (row + 1) + '' + (col + 1)])
      this.Score(this.state.SisNext2);
    }

  }
  if (box[row - 1][col] === 'S' && box[row + 1][col] === 'S') {

    if (!this.checkScoredLines(((row - 1) + '' + col), (row + 1) +''+ col)) {
      console.log('Vertical SOS');
      this.state.scoredLines.push([(row - 1) + '' + col, (row + 1) + '' + col])
      this.Score(this.state.SisNext2);
    }
  }
  if (box[row][col - 1] === 'S' && box[row][col + 1] === 'S') {
    if (!this.checkScoredLines((row + '' + (col-1)), row +''+ (col+1))) {
      console.log('Horizontal SOS');
      this.state.scoredLines.push([row + '' + (col - 1), row + '' + (col + 1)])
      this.Score(this.state.SisNext2);
    }
  }
}

handleClick(i) {
  const history = this.state.history.slice(0, this.state.currentStepNumber + 1);
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  this.state.currentRow = parseInt(i / BoardSize);
  this.state.currentColumn = parseInt(i % BoardSize);

  if (squares[i]) {
    return;
  }
  squares[i] = this.state.sIsNext ? 'S' : 'O';

  this.setState({
    history: history.concat([{
      squares,
      stepNumber: history.length,
    }, ]),
    sIsNext: !this.state.sIsNext,
    currentStepNumber: history.length,
  });
}

  render() {
    const { history} = this.state;
    const current = history[this.state.currentStepNumber];
    const { winner, winnerRow } = this.calculateWinner(current.squares, this.state.currentRow, this.state.currentColumn );
    
    this.state.SisNext2 = this.state.sIsNext;
    //console.log('console2: ' + SisNext2);
    let status;
    if (winner) {
      status = `Winner ${winner}`;
    } else if (history.length === 10) {
      status = 'Draw. No one won.';
    } else {
      status = `Next player: ${this.state.sIsNext ? 'S' : 'O'}`;
    }
    //console.log('c square' + current.squares)
    return (
      <div className="game-info">
        <div>
          <h1>Player 1 Score: { this.state.Player1Score}</h1>
          <h1>Player 2 Score: { this.state.Player2Score}</h1>
        </div>
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerSquares={winnerRow}
            BoardSize = {BoardSize}
            onClick={i => this.handleClick(i)}
          />
        </div>
        </div>
      </div>
    );
  }
  
}

export default Game;
