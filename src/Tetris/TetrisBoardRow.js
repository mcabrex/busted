import React, { Component } from "react";
import TetrisBoardPiece from "./TetrisBoardPiece";

class TetrisBoardRow extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentDidMount() {
  }
  render() {
    const row = () => {
      const piecesArr = [];
      const { position } = this.props;
      for (let i = 0; i < 11; i++) {
        if (position && position.length > 0 && position[0] === i) piecesArr.push(<TetrisBoardPiece key={i} activeColor="blue"/>);
        else piecesArr.push(<TetrisBoardPiece key={i} />);
      }
      return piecesArr;
    };

    return <div className="tetris-board-row">{row()}</div>;
  }
}

export default TetrisBoardRow;
