import React from 'react';
import Square from './Square';
    const BoardSize = 30;
class Board extends React.Component {
  createBoard(row, col) {
    const board = []; 

    let cellCounter = 0;

    for (let i = 0; i < row; i++) {
      const columns = [];
      for (let j = 0; j < col; j++) {
        columns.push(this.renderSquare(cellCounter++));
      }
      board.push(<div key={i} className="board-row">{columns}</div>);
      
    }
    return board;
  }

  renderSquare(i) {
    // var orig = parseInt(i / 9);
    // console.log('rrow' + parseInt(i / 9));
    // console.log('ccol' + parseInt(i % 9));
    // console.log('original Square: ' + orig * 9);
    // console.log('renderSquare: ' + i );
    const winnerClass =
      this.props.winnerSquares &&
      (this.props.winnerSquares[0] === i ||
        this.props.winnerSquares[1] === i ||
        this.props.winnerSquares[2] === i)
        ? 'square--green'
        : '';

    return (
      <Square
        winnerClass={winnerClass}
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return <div>{this.createBoard(this.props.BoardSize, this.props.BoardSize)}</div>;
  }
}

export default Board;
