import React, { Component } from "react";
import TetrisBoardRow from "./TetrisBoardRow";
import { TetrisContext } from "../contexts/Tetris/TetrisContext";

class TetrisBoard extends Component {
  componentDidMount(){
    console.log(this.props.boardMap)
    
  }
  render() {
    return (
      <TetrisContext.Consumer>
        {({ handleKeyPress, handleStart, rowInd, positionArr, boardMap }) => {
          const board = () => {
            const boardArr = [];
            boardMap.forEach((row,ind) => {
                boardArr.push(
                  <TetrisBoardRow key={ind} row={row} position={positionArr} />
                )
            })
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
