import { useState } from "react"
import {boardProps,DIRECTIONS} from "../lib/types"
import { generateBoard, getSnakeInitialPosition, useInterval , getNextHead} from '../lib/utils'


const Board = ({row,col} : boardProps) => {
    const board = generateBoard(row,col)

    const [head,setHead] = useState(getSnakeInitialPosition(board))
    const [tail,setTail] = useState(getSnakeInitialPosition(board))

    const [snakeCells,setSnakeCells] = useState(new Set([getSnakeInitialPosition(board).cell]))
    const [direction,setDirection] = useState( DIRECTIONS.RIGHT )

    const moveSnake = (direction : DIRECTIONS) =>{
        const currentHead = { row:head.row , col : head.col }
        const nextHead = getNextHead( currentHead , direction ,board)
        setHead(nextHead)
        setSnakeCells(new Set([...snakeCells,nextHead.cell]))

    }
    
        useInterval(() => moveSnake(direction) ,150)

    return (
        <div className="board">
           {board.map((row,idx) =>{
               return <div key={idx} className="row"> 
                    {row.map(col =>{
                        return <div data-id={col} key= {col} className={snakeCells.has(col) ?  "cell snake" : "cell" } ></div>
                    })}
               </div>
           })}
        </div>
    )
}
export default Board
