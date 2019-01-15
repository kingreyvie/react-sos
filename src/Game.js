import React from 'react';
import Board from './Board';
function calculateAllSide(arr, row, col){
  calculateScoreSlantRight(arr, row, col);
  calculateScoreSlantLeft(arr, row, col);
  calculateScoreVertical(arr, row, col);
  calculateScoreHorizontal(arr, row, col);
}
function calculateScoreSlantRight(arr, row, col) {
//slant right
    if(arr[row-1][col+1] === 'S' && arr[row+1][col-1] === 'S' ){
      console.log('Slant right SOS');
    }
}
function calculateScoreSlantLeft(arr, row, col){
//slant left 
    if(arr[row-1][col-1] === 'S' && arr[row+1][col+1] === 'S'){
      console.log('Slant left SOS');
    }
}
function calculateScoreVertical(arr, row, col){
//vertical 
    if(arr[row-1][col] === 'S' && arr[row+1][col] === 'S'){
      console.log('Vertical SOS');
    }
}
function calculateScoreHorizontal(arr, row, col){
//horizontal
    if(arr[row][col-1] === 'S' && arr[row][col+1] === 'S'){
      console.log('Horizontal SOS');
    }
}

const calculateWinner = (squares, row, col) => {
var arr = listToMatrix(squares, 9);
var OriginalRow = row;
var OriginalCol = col;
if (row > 0 && col > 0 && row < 8 && col < 8) {
  if(arr[row][col]==='O'){
    calculateAllSide(arr, row, col);
  }
  if (arr[row - 1][col] === 'O') {
    row--;
    calculateAllSide(arr, row, col);
    row++;
  } //top
  if (arr[row - 1][col - 1] === 'O') {
    row--;
    col--;
    calculateAllSide(arr,row,col);
    row = OriginalRow;
    col = OriginalCol;
  } //top left
  if (arr[row][col - 1] === 'O') {
    col--;
    calculateAllSide(arr, row, col);
    row = OriginalRow;
    col = OriginalCol;
  } //left
  if (arr[row + 1][col - 1] === 'O') {
    row++;
    col--;
    calculateAllSide(arr, row, col);
    row = OriginalRow;
    col = OriginalCol;
  } // bot left
  if (arr[row + 1][col] === 'O') {
    row++;
    calculateAllSide(arr, row, col);
    row = OriginalRow;
    col = OriginalCol;
  } //bot 
  if (arr[row + 1][col + 1] === 'O') {
    row++;
    col++;
    calculateAllSide(arr, row, col);
    row = OriginalRow;
    col = OriginalCol;
  } //bot right
  if (arr[row][col + 1] === 'O') {
    col++;
    calculateAllSide(arr, row, col);
    row = OriginalRow;
    col = OriginalCol;
  } //bot right
  if (arr[row - 1][col + 1] === 'O') {
    row--;
    col++;
    calculateAllSide(arr, row, col);
    row = OriginalRow;
    col = OriginalCol;
    
  } //top right

  // calculateScore(arr, row, col);
console.log('\n')
}
console.log('Row: ' + row + ' Col: ' + col + '\n');
console.log('OriginalRow: ' + OriginalRow + ' OriginalCol: '+ OriginalCol);
console.log('\n')
 //return { winner: squares[a], winnerRow: lines[i] };
  return { winner: null, winnerRow: null };
};

const getLocation = (move) => {
  const locationMap = {
    0: 'row: 1, col: 1',
    1: 'row: 1, col: 2',
    2: 'row: 1, col: 3',
    3: 'row: 2, col: 1',
    4: 'row: 2, col: 2',
    5: 'row: 2, col: 3',
    6: 'row: 3, col: 1',
    7: 'row: 3, col: 2',
    8: 'row: 3, col: 3',
  };

  return locationMap[move];
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

// function GetCurrentLocation(currentRow, currentCol) {
//   return ((rowLimit * currentRow) - (rowLimit - currentCol) - 1)
// }

    let currentRow = 0;
    let currentColumn = 0;
    let score = 0 ;
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(81).fill(null),
        },
      ],
      // Row: 0,
      // Column: 0,
      currentStepNumber: 0,
      xIsNext: true,
      score: 0,
      winningLines:[],
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.currentStepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    currentRow = parseInt(i / 9);
    currentColumn = parseInt(i % 9);

    if (calculateWinner(squares, currentRow, currentColumn).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'S' : 'O';
    this.setState({
      history: history.concat([
        {
          squares,
          currentLocation: getLocation(i),
          stepNumber: history.length,
        },
      ]),

      xIsNext: !this.state.xIsNext,
      currentStepNumber: history.length,
    });
    // console.log('currentRow: ' + currentRow + '\ncurrentColumn: ' + currentColumn);
  }

  jumpTo(step) {
    this.setState({
      currentStepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  sortMoves() {
    this.setState({
      history: this.state.history.reverse(),
    });
  }

  render() {
    const { history} = this.state;
    const current = history[this.state.currentStepNumber];
    const { winner, winnerRow } = calculateWinner(current.squares, currentRow, currentColumn );

    const moves = history.map((step, move) => {
      const currentLocation = '';
      const desc = step.stepNumber ? `Go to move #${step.stepNumber}` : 'Go to game start';
      const classButton = move === this.state.currentStepNumber ? 'button--green' : '';
      // console.log('step.currentLocation ' + step.currentLocation)
      return (
        <li key={step.stepNumber}>
          <button className={`${classButton} button`} onClick={() => this.jumpTo(move)}>
            {`${desc} ${currentLocation}`}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner ${winner}`;
    } else if (history.length === 10) {
      status = 'Draw. No one won.';
    } else {
      status = `Next player: ${this.state.xIsNext ? 'S' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerSquares={winnerRow}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button className="button" onClick={() => this.sortMoves()}>
            Sort moves
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
  
}

export default Game;
