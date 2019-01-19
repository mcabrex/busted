import React, { Component } from "react";
import TetrisBoardRow from "./TetrisBoardRow";
import { TetrisContext } from "../contexts/Tetris/TetrisContext";

class TetrisBoard extends Component {
  render() {
    return (
      <TetrisContext.Consumer>
        {({ handleKeyPress, handleStart, rowInd, positionArr }) => {
          const board = () => {
            const boardArr = [];
            for (let i = 0; i < 17; i++) {
              if (rowInd === i) {
                boardArr.push(
                  <TetrisBoardRow key={i} position={positionArr} />
                );
              } else {
                boardArr.push(<TetrisBoardRow key={i} />);
              }
            }
            return boardArr;
          };
          return (
            <div className="tetris-board" onKeyPress={handleKeyPress}>
              {board()}
              <button onClick={handleStart}>Start</button>
            </div>
          );
        }}
      </TetrisContext.Consumer>
    );
  }
}

export default TetrisBoard;
