const DIRECTIONS  ={
    UP:"UP",
    DOWN:"DOWN",
    LEFT:"LEFT" ,
    RIGHT:"RIGHT" 
}

export const createBoard =  (BOARD_SIZE) =>{
    let counter = 1
    board = []

    for(let row = 0 ; row < BOARD_SIZE ; row ++ ){
        let currentRow = []
        for(let column = 0 ; column < BOARD_SIZE ; column ++ ){
            currentRow.push(counter++)
        }
        board.push(currentRow)
    }
    return board
}

export const updateCoords  = (prevCoords , direction) =>{
    switch(direction){
        case DIRECTIONS.UP : 
            return {row : prevCoords.row - 1 , col : prevCoords.col }

        case DIRECTIONS.DOWN : 
            return {row : prevCoords.row + 1 , col : prevCoords.col }

        case DIRECTIONS.LEFT : 
            return {row : prevCoords.row  , col : prevCoords.col - 1 }

        case DIRECTIONS.RIGHT : 
            return {row : prevCoords.row , col : prevCoords.col  + 1}

    }
} 

export const isOutOfBounds = (coords , board) =>{
    if( coords.row  >= board.length || coords.row < 0  || coords.col  >= board[0].length || coords.col < 0) return true ;
    return false ;
}

export const getDirectionFromKeyPress = (key) =>{
    switch(key){
        case "ArrowUp" : return DIRECTIONS.UP
        case "ArrowDown" : return DIRECTIONS.Down
        case "ArrowLeft" : return DIRECTIONS.LEFT
        case "ArrowRight" : return DIRECTIONS.Right
    }
}