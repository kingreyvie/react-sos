import React from 'react';
import Board from './Board';

let SisNext2 = true;
let BoardSize = 9;
let currentRow = 0;
let currentColumn = 0;
let Player1Score =0;
let Player2Score =0;

function Score(sIsWinner){
  if(sIsWinner){
    Player1Score += 1;
  }else{
    Player2Score += 1;
  }
}

function calculateAllSide(arr, row, col){
    if(arr[row-1][col+1] === 'S' && arr[row+1][col-1] === 'S' ){
      console.log('Slant right SOS');
     Score(SisNext2);
     console.log('sIsNext2' + SisNext2);
    }
    if(arr[row-1][col-1] === 'S' && arr[row+1][col+1] === 'S'){
      console.log('Slant left SOS');
      Score(SisNext2);
    }
    if(arr[row-1][col] === 'S' && arr[row+1][col] === 'S'){
      console.log('Vertical SOS');
      Score(SisNext2);
    }
    if(arr[row][col-1] === 'S' && arr[row][col+1] === 'S'){
      console.log('Horizontal SOS');
      Score(SisNext2);
    }
}

const calculateWinner = (squares, row, col) => {
var arr = listToMatrix(squares, BoardSize);
var OriginalRow = row;
var OriginalCol = col;

if (row > 0 && col > 0 && row < (BoardSize-1) && col < (BoardSize-1)) {
  if(arr[row][col]==='O') {calculateAllSide(arr, row, col);} //mid
  if (arr[row - 1][col] === 'O') {row--;calculateAllSide(arr, row, col);row++;} //top
  if (arr[row - 1][col - 1] === 'O') {row--;col--; calculateAllSide(arr,row,col);row = OriginalRow; col = OriginalCol;} //top left
  if (arr[row][col - 1] === 'O') {col--;calculateAllSide(arr, row, col);row = OriginalRow; col = OriginalCol;} //left
  if (arr[row + 1][col - 1] === 'O') {row++;col--; calculateAllSide(arr, row, col);row = OriginalRow; col = OriginalCol;} // bot left
  if (arr[row + 1][col] === 'O') {row++; calculateAllSide(arr, row, col);row = OriginalRow; col = OriginalCol;} //bot 
  if (arr[row + 1][col + 1] === 'O') {row++;col++; calculateAllSide(arr, row, col);row = OriginalRow; col = OriginalCol;} //bot right
  if (arr[row][col + 1] === 'O') {col++; calculateAllSide(arr, row, col);row = OriginalRow; col = OriginalCol;} //bot right
  if (arr[row - 1][col + 1] === 'O') {row--;col++; calculateAllSide(arr, row, col);row = OriginalRow; col = OriginalCol;} //top right

console.log('\n')
}

//return { winner: squares[a], winnerRow: lines[i] };
// return {winner: arr[row][col], winnerRow: }
  return { winner: null, winnerRow: null };
};
function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }
    // console.log('matrix' + matrix);
    return matrix;
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(BoardSize * BoardSize).fill(null),
        },
      ],
      // Row: 0,
      // Column: 0,
      winnerHistory: [],
      currentStepNumber: 0,
      sIsNext: true,
      score: 0,
      winnerLineHistory: ['asd', 'asd', 'asd'],
      winningLines:[],
    };
  }

  handleClick(i) {
    
    const history = this.state.history.slice(0, this.state.currentStepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    currentRow = parseInt(i / BoardSize);
    currentColumn = parseInt(i % BoardSize);
    
    if (squares[i]) {
      return;
     }
    squares[i] = this.state.sIsNext ? 'S' : 'O';

    this.setState({
      history: history.concat([
        {
          squares,
          stepNumber: history.length,
        },
      ]),
      sIsNext: !this.state.sIsNext,
      currentStepNumber: history.length,
    });

    // console.log('currentRow: ' + currentRow + '\ncurrentColumn: ' + currentColumn);
  console.log('sIsNext' + this.state.sIsNext);
  }

  render() {
    const { history} = this.state;
    const current = history[this.state.currentStepNumber];
    const { winner, winnerRow } = calculateWinner(current.squares, currentRow, currentColumn );
    SisNext2 = this.state.sIsNext;
    console.log('console2: ' + SisNext2);
    const moves = history.map((step, move) => {
      const classButton = move === this.state.currentStepNumber ? 'button--green' : '';
      // console.log('step.currentLocation ' + step.currentLocation)

    });

    let status;
    if (winner) {
      status = `Winner ${winner}`;
    } else if (history.length === 10) {
      status = 'Draw. No one won.';
    } else {
      status = `Next player: ${this.state.sIsNext ? 'S' : 'O'}`;
    }
    console.log('c square' + current.squares)
    return (
      <div className="game-info">
        <div>
          <h1>Player 1 Score: { Player1Score}</h1>
          <h1>Player 2 Score: { Player2Score}</h1>
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
