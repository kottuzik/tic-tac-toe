import React from "react";

import Cell from "./Cell";

class Board extends React.Component {
  render() {
    return (
      <div className="ticTacToe">
        {this.props.cells.map((cell, i) => (
          <Cell
            key={i}
            cellId={i}
            clickOnCell={this.props.clickOnCell}
            cell={cell}
          />
        ))}
      </div>
    );
  }
}

export default Board;
