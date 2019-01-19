import React from "react";
import TetrisState from "./TetrisState";

export const TetrisContext = React.createContext();

export class TetrisProvider extends React.Component {
  state = TetrisState;

  //***IMPORTANT***, USE FUNCTION EXPRESSION, since you're defining the context of this in the provider's value
  //handleMode(e){} ----> WILL NOT WORK
  //handleMode = (e) => {} ----> good to go!
  handleStart = e => {
    this.setState({
      positionArr: [5]
    });
    //whole page recognizes runs key events ==> clicking start will always reset everything and put block position back to center
    setInterval(() => {
      //set interval runs this function continuously
      //need this to keep track of rows to know when to stop!
      //every time it runs this it has to check two things, what the next row is and what the position of the current piece is
      //so, if the next rows space is occupied by any of the current pieces positions stop the piece right there
      //always gonna go from top to bottom so only have to work on the bottom most array and work from there?
      const { rowInd, positionArr } = this.state;
      const newRowInd = rowInd === 17 ? 0 : rowInd + 1;
      const newPositionArr = rowInd === 17 ? [5] : positionArr;
      //reset at end minimal (17 being height of board)
      this.setState({
        positionArr: newPositionArr,
        rowInd: newRowInd
      });
    }, 400);
  };

  handleKeyPress = evt => {
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
    return (
      //use the context to grab the provider, inside the provider render the children
      <TetrisContext.Provider
        value={{
          ...this.state,
          handleStart: this.handleStart,
          handleKeyPress: this.handleKeyPress
        }}
      >
        {this.props.children}
      </TetrisContext.Provider>
    );
  }
}