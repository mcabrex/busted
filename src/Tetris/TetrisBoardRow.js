import React, { Component } from "react";
import TetrisBoardPiece from "./TetrisBoardPiece";

class TetrisBoardRow extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    const row = () => {
      const piecesArr = [];
      const { row } = this.props;
      const rowMaker = (tetrisRow) => {
        tetrisRow.forEach((tile,ind)=>{
          if(tile){
            //row of tiles set to 0 or 1, color blue if active
            piecesArr.push(<TetrisBoardPiece key={ind} activeColor="blue"/>);
          } else {
            piecesArr.push(<TetrisBoardPiece key={ind} />);
          }
        })
      }
      if(row && row.length > 0){
        //make sure row is initialized first
        rowMaker(row)
      }
      return piecesArr;
    };

    return <div className="tetris-board-row">{row()}</div>;
  }
}

export default TetrisBoardRow;
