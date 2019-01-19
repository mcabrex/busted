import React, { Component } from 'react';
import "./styles/index.scss";
import TetrisBoard from "./Tetris/TetrisBoard"
import { TetrisProvider,TetrisContext} from "./contexts/Tetris/TetrisContext"
class App extends Component {
  render() {
    return (
      <div className="App">
        <TetrisProvider>
          <TetrisContext.Consumer>
            {value => <TetrisBoard {...value} />}
          </TetrisContext.Consumer>
        </TetrisProvider>
      </div>
    );
  }
}

export default App;
