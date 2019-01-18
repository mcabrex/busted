import React, { Component } from "react";
import TetrisBoardRow from "./TetrisBoardRow";

class TetrisBoard extends Component {
  constructor(props) {
    super();
    this.state = {
      positionArr: [],
      rowInd: 0,
      boardMap: []
      //boarMap array holds array of rows, saved and set to state every time a piece reaches it's bottom most position 
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    //initial position of falling block
    this.setState({
      positionArr: [5]
    });
  }
  handleClick(evt) {
    //pieces start falling down on click
    this.setState({
      positionArr: [5]
    });
    for (let i = 0; i < 17; i++) {
      //17 is the height of the tetris board, important to use let to keep i scoped for each setTimeOut
      setTimeout(() => {
        this.setState({
          //positionArr to keep track of falling piece coordinates on the array
          rowInd: i
          //rowInd equal to i to give appearance of falling down later
        });
        if(i===17){
            //last iteration

        }
      }, 400 * i);
    }
  }

  handleKeyPress(evt) {
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
  }
  render() {
    const board = () => {
      //board created through function expression so it's able to be updated dependent on state
      const { rowInd, positionArr } = this.state;
      const boardArr = [];
      for (let i = 0; i < 17; i++) {
        //so far this function only keeps track of falling piece,perhaps a bad idea to have the function that creates the board be dependent on this?
        if (rowInd === i) {
          //pass down positionArr to the row to keep track of when it's at the right index on the board
          boardArr.push(<TetrisBoardRow key={i} position={positionArr} />);
        } else {
          boardArr.push(<TetrisBoardRow key={i} />);
        }
      }
      return boardArr;
    };
    return (
      <div className="tetris-board" onKeyPress={this.handleKeyPress}>
        {board()}
        <button onClick={this.handleClick}>Start</button>
      </div>
    );
  }
}

export default TetrisBoard;
