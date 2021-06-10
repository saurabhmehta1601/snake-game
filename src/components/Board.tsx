import { useState } from "react"
import {boardProps,DIRECTIONS} from "../lib/types"
import { generateBoard, getSnakeInitialPosition, useInterval , getNextHead, getNextTail} from '../lib/utils'


const Board = ({row,col} : boardProps) => {
    const board = generateBoard(row,col)

    const [head,setHead] = useState(getSnakeInitialPosition(board))
    const [tail,setTail] = useState(getSnakeInitialPosition(board))

    const [snakeCells,setSnakeCells] = useState(new Set([getSnakeInitialPosition(board).cell]))
    const [direction,setDirection] = useState( DIRECTIONS.RIGHT )

    const moveSnake = (direction : DIRECTIONS) =>{
        // finding next position of head based on direction and then add new head to snake cells 
        const currentHead = { row:head.row , col : head.col }
        const currentTail = { row:tail.row , col : tail.col }
        const nextHead = getNextHead( currentHead , direction ,board)
        // update then new head of snake
        setHead(nextHead)
        
        const newSnakeCells = snakeCells
        // remove old tail from cells 
        newSnakeCells.delete(tail.cell)
        newSnakeCells.add(nextHead.cell)
        // update tail of snake
        setTail(getNextTail(currentTail,snakeCells,board))
        // update snakecells
        setSnakeCells(newSnakeCells)

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
