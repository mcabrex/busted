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
      const { position,row } = this.props;
      console.log('row',row)
      const rowMaker = (tetrisRow) => {
        tetrisRow.forEach((tile,ind)=>{
          if(tile){
            piecesArr.push(<TetrisBoardPiece key={ind} activeColor="blue"/>);
          } else {
            piecesArr.push(<TetrisBoardPiece key={ind} />);
          }
        })
      }
      if(row && row.length > 0){
        rowMaker(row)
      }
      return piecesArr;
    };

    return <div className="tetris-board-row">{row()}</div>;
  }
}

export default TetrisBoardRow;
