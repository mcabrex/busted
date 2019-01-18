import React, { Component } from 'react';
import "./styles/index.scss";
import TetrisBoard from "./Tetris/TetrisBoard"

class App extends Component {
  render() {
    return (
      <div className="App">
        <TetrisBoard />
      </div>
    );
  }
}

export default App;
