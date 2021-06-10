export const generateBoard = (row,col) =>{
    let counter = 1
    let board = []

    for(let i =0 ; i < row ; i++){
        let currentRow = []
        for(let j =0 ; j <col ; j++){
            currentRow.push(counter++)
        }
        board.push(currentRow)
    }
    return board
}

export const getInitialSnakeCoords = (board) =>{
    const row = board.length/3
    const col  = board[0].length/3
    const cell = board[row][cell]
    
    return {
        row , col ,cell
    }
}