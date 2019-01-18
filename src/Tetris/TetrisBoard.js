import React, { Component } from "react";
import TetrisBoardRow from "./TetrisBoardRow";

class TetrisBoard extends Component {
  constructor(props) {
    super();
    this.state = {
      positionArr: [],
      //positionArr is gonna hold the coordinates of the piece itself, relative to the row(s) it's on
      rowInd: 0,
      boardMap: []
      //boarMap array holds array of rows, saved and set to state every time a piece reaches it's bottom most position 
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    //initial position of falling block to center of tetris board
    this.setState({
      positionArr: [5]
    });
  }
  handleClick(evt) {
    //a large amount of the logic is gonn have to be here at the start button, seperate into different file?
    //pieces start falling down on click
    this.setState({
      positionArr: [5]
    });
    //whole page recognizes runs key events ==> clicking start will always reset everything and put block position back to center
    setInterval(()=>{
      const {rowInd,positionArr} = this.state
      const newRowInd = rowInd === 17 ? 0 : rowInd+1
      const newPositionArr = rowInd === 17 ? [5] : positionArr
      console.log(rowInd,newRowInd)
      this.setState({
        positionArr: newPositionArr,
        rowInd: newRowInd
      })
    },400)
    // for (let i = 0; i < 17; i++) {
    //   //need this to keep track of rows to know when to stop!
    //     //every time it runs this it has to check two things, what the next row is and what the position of the current piece is
    //     //so, if the next rows space is occupied by any of the current pieces positions stop the piece right there
    //       //always gonna go from top to bottom so only have to work on the bottom most array and work from there?
    //   //17 is the height of the tetris board, important to use 'let' to keep i scoped for each setTimeOut
    //   setTimeout(() => {
    //     this.setState({
    //       rowInd: i
    //       //rowInd equal to i to give appearance of falling down later
    //         //reset loop every time? gonna have to be real precise with data management due to setTimeout
    //     });
    //     if(i===17){
    //         //last iteration

    //     }
    //   }, 400 * i);
    // }
  }

  handleKeyPress(evt) {
    //
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
