import { useEffect, useState } from "react"
import {boardProps,DIRECTIONS} from "../lib/types"
import { generateBoard, getSnakeInitialPosition, useInterval , getNextHead, getNextTail , getRandomFoodPosition } from '../lib/utils'
import GameOver from "./GameOver"


const Board = ({row,col} : boardProps) => {
    const board = generateBoard(row,col)
    const [gameOver,setGameOver] = useState(false)
    const [speed,setSpeed] = useState<number  | null >(250)

    const [snakeCells,setSnakeCells] = useState(new Set([getSnakeInitialPosition(board).cell]))
    const [foodCell,setFoodCell] = useState(getRandomFoodPosition(board,snakeCells))

    const [head,setHead] = useState(getSnakeInitialPosition(board))
    const [tail,setTail] = useState(getSnakeInitialPosition(board))

    const [direction,setDirection] = useState( DIRECTIONS.RIGHT )

    const moveSnake = (direction : DIRECTIONS) =>{
        console.log(head,tail)
        // finding next position of head based on direction and then add new head to snake cells 
        const currentHead = { row:head.row , col : head.col }

        
        const nextHead = getNextHead( currentHead , direction ,board)
        // when next is null because snake out of board
        if(!nextHead) {
            setGameOver(true)
            setSpeed(null)
            return
        }
        const currentTail = { row:tail.row , col : tail.col }
        // if snake bites itself game over
        if(snakeCells.has(nextHead.cell)){
            setGameOver(true) 
            return 
        }
        
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
    const handleKeyPress = (e : any) =>{
        switch(e.key){
            case "ArrowRight" : 
                setDirection(DIRECTIONS.RIGHT)
                break 
            case "ArrowLeft" : 
            setDirection(DIRECTIONS.LEFT)
                break 
            case "ArrowUp" : 
            setDirection(DIRECTIONS.TOP)
                break 
            case "ArrowDown" : 
            setDirection(DIRECTIONS.BOTTOM)
                break 
        }
    }
        useEffect(() =>{
            window.addEventListener("keydown",handleKeyPress)
            return () => {window.removeEventListener("keydown",handleKeyPress) }
        },[])    

        // this will stop when delay is null here delay is speed so on gameover I will set speed to null
        useInterval(() => {
            moveSnake(direction) 
        },speed)

    return (
        <>
       {gameOver ?  <GameOver />:  <div className="board">
           {board.map((row,idx) =>{
               return <div key={idx} className="row"> 
                    {row.map(col =>{
                        return <div data-id={col} key= {col} className={snakeCells.has(col) ?  "cell snake" : col===foodCell ? "cell food" : "cell" } ></div>
                    })}
               </div>
           })}
        </div>}
        </>
    )
}
export default Board
