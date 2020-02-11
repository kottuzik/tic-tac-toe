import React, { Component } from "react";
import "./styles.css";
import Board from "./Components/Board";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: new Array(9).fill(""),
      playerOne: true,
      steps: [],
      winner: null
    };
  }

 /*Win Combination*/
  winCom = [   
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  checkForWin = (arr, currentPlayer) => {
    let p = currentPlayer ? "X" : "O";
    let win = this.winCom;
    for (let i = 0; i < 8; i++) {
      if (
        arr[win[i][0]] === p &&
        arr[win[i][1]] === p &&
        arr[win[i][2]] === p
      ) {
        return true;
      }
    }
    return false;
  };

  clickOnCell = cellId => {
    if (this.state.winner) {
      return;
    }
    let arr = [...this.state.cells];
    if (arr[cellId] !== "") {
      return;
    }
    this.state.playerOne ? (arr[cellId] = "X") : (arr[cellId] = "O");
    if (this.checkForWin(arr, this.state.playerOne)) {
      this.setState({ winner: arr[cellId] });
    }

    this.setState({
      cells: arr,
      playerOne: !this.state.playerOne,
      steps: [cellId, ...this.state.steps]
    });
  };

  newGame = () => {
    this.setState({ 
      cells: new Array(9).fill(""), 
      steps: [], 
      message: "",
      playerOne: true,
      winner: null });
  };

  undoStep = () => {
    let cellsArr = [...this.state.cells];
    let stepsArr = [...this.state.steps];
    cellsArr[stepsArr[0]] = "";
    stepsArr.shift();
    this.setState({
      cells: cellsArr,
      steps: stepsArr,
      playerOne: !this.state.playerOne
    });
  };

  saveGame = () => {
    sessionStorage.setItem("cells", this.state.cells);
    sessionStorage.setItem("steps", this.state.steps);
    sessionStorage.setItem("player", this.state.playerOne)
  };
  loadGame = () => {
    this.setState({
      cells:  sessionStorage.getItem("cells").split(","),
      steps:  sessionStorage.getItem("steps").split(","),
      player: sessionStorage.getItem("player")
    });
  };
  render() {
    return (
      <div className="App">
        <h1>Tic Tac Toe Eva</h1>
        <div className="buttonWrap">
          <button onClick={this.newGame}>New Game</button>
          <button onClick={this.undoStep}>Undo</button>
          <button onClick={this.saveGame}>Save</button>
          <button onClick={this.loadGame}>Load</button>
        </div>

        {this.state.winner ? (
          <h2>Player {this.state.winner} Won!</h2>
        ) : (
          <h3>{this.state.playerOne ? "It's X turn" : "It's O turn"}</h3>
        )}
        <Board clickOnCell={this.clickOnCell} cells={this.state.cells} />

        {/* {this.state.steps.map(x => x)} */}
      </div>
    );
  }
}
export default App;
