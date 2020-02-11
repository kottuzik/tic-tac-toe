import React, { Component } from "react";

class Cell extends Component {
  render() {
    return (
      <div
        className="cell"
        onClick={() => this.props.clickOnCell(this.props.cellId)}
      >
        {this.props.cell}
      </div>
    );
  }
}
export default Cell;
