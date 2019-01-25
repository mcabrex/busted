import React, { Component } from "react";
import TetrisBoardRow from "./TetrisBoardRow";
import { TetrisContext } from "../contexts/Tetris/TetrisContext";

class TetrisBoard extends Component {
  render() {
    return (
      <TetrisContext.Consumer>
        {({
          handleKeyPress,
          handleStart,
          handleStop,
          rowInd,
          positionArr,
          boardMap
        }) => {
          const board = () => {
            const boardArr = [];
            boardMap.forEach((row, ind) => {
              //load an array of rows based off the boardMap from the state
              boardArr.push(
                //pass down the row layout of the board as well as position of the current piece
                <TetrisBoardRow key={ind} row={row} position={positionArr} />
              );
            });
            return boardArr;
          };
          return (
            <div className="tetris-board" onKeyPress={handleKeyPress}>
              {board()}
              <button onClick={handleStart}>Start</button>
              <button onClick={handleStop}>Stop</button>
            </div>
          );
        }}
      </TetrisContext.Consumer>
    );
  }
}

export default TetrisBoard;
