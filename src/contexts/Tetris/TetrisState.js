let TetrisState = {
    positionArr: [],
    //positionArr is gonna hold the coordinates of the piece itself, relative to the row(s) it's on
    rowInd: 0,
    boardMap: []
    //boarMap array holds array of rows, saved and set to state every time a piece reaches it's bottom most position
}

export default TetrisState