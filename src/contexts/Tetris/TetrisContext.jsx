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
      const { rowInd, positionArr, boardMap } = this.state;
      const newBoard = boardMap
      const nextRow = newBoard[rowInd +1]
      // console.log(rowInd,boardMap)
      if(nextRow){
        //first check, are there any blocks at the NEXT layer (does the next layer even exist on the boardMap?)
        //this check should start happening every time after the first
        console.log('1check',newBoard,nextRow)
        if(nextRow.indexOf(positionArr[0]) > -1){
          //second check, if it exists, will there be collision on the next row given the current board piece?
          //if so save the current position to the current row
          // ~~~NOTE~~~ move this logic to a boolean variable outside for a more complex check
          newBoard[rowInd] = [...positionArr]
          // console.log('2check')

        } else {
          //if there won't be a collision and the nextRow exists you've reached here
          newBoard[rowInd+1].push(...positionArr)
          console.log('newBoard',newBoard[rowInd+1])
        }
      } 

      const newRowInd = rowInd === 17 ? 0 : rowInd + 1;
      const newPositionArr = rowInd === 17 ? [5] : positionArr;
      //reset at end baseline (17 being height of board)
      this.setState({
        boardMap: newBoard,
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
  };

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
