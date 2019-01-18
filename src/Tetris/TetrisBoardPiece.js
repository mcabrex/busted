import React, { Component } from 'react';

class TetrisBoardPiece extends Component {
  constructor(props) {
    super();
    this.state = {
    };
  }
  
  render() {
    const {activeColor} = this.props
    const currClass = activeColor || "inactive"
    return (
      <div className={`tetris-board-piece-${currClass}`}>
        
      </div>
    );
  }
}

export default TetrisBoardPiece;
