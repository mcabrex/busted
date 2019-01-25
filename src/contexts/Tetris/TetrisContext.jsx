import React from "react";
import TetrisState from "./TetrisState";
import { TaskTimer } from "tasktimer";

export const TetrisContext = React.createContext();

export class TetrisProvider extends React.Component {
  state = TetrisState;
  //***IMPORTANT***, USE FUNCTION EXPRESSION, since you're defining the context of this in the provider's value
  //handleMode(e){} ----> WILL NOT WORK
  //handleMode = (e) => {} ----> good to go!
  handleStart = e => {
    this.setState({
      positionArr: [5],
    });
    //whole page recognizes runs key events ==> clicking start will always reset everything and put block position back to center
    const startTimer = new TaskTimer(400);
    startTimer.on('tick', ()=>{
        //set interval runs this function continuously on start
        //every time it runs this it has to check two things, what the next row is and where the current piece is
        //so, if the next row's space is occupied by any of the current pieces positions stop the piece right there
        const { rowInd, positionArr, boardMap } = this.state;
        let newBoard = [...boardMap];
        let currentRow = newBoard[rowInd];
        let nextRow = newBoard[rowInd + 1];
        let previousRow = newBoard[rowInd - 1];
        currentRow[positionArr[0]] = 1;
        if (previousRow) previousRow[positionArr[0]] = 0;

        const newRowInd = rowInd === 17 ? 0 : rowInd + 1;
        const newPositionArr =
          rowInd === 17 || nextRow[positionArr[0]] === 1 ? [5] : positionArr;
        //reset at end baseline (17 being height of board)
        this.setState({
          boardMap: newBoard,
          positionArr: newPositionArr,
          rowInd: newRowInd
        });
    })
    startTimer.start();
    this.setState({
      timer: startTimer
    })
    console.log(startTimer)

  };

  handleKeyPress = evt => {
    console.log("key evt", evt.key);
    let { positionArr } = this.state;
    let left = positionArr[0] - 1;
    let right = positionArr[0] + 1;
    switch (evt.key) {
      case "a":
        this.setState({
          positionArr: positionArr[0] > 0 ? [left] : [positionArr[0]]
        });
        break;
      case "d":
        this.setState({
          positionArr: positionArr[0] < 10 ? [right] : [positionArr[0]]
        });
        break;
      default:
        break;
    }
  };

  handleStop = evt => {
    this.state.timer.stop();
  }

  render() {
    return (
      //use the context to grab the provider, inside the provider render the children
      <TetrisContext.Provider
        value={{
          ...this.state,
          handleStart: this.handleStart,
          handleStop: this.handleStop,
          handleKeyPress: this.handleKeyPress
        }}
      >
        {this.props.children}
      </TetrisContext.Provider>
    );
  }
}
