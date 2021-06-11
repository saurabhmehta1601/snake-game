import { useEffect, useState } from "react"
import {boardProps,DIRECTIONS} from "../lib/types"
import { generateBoard, getSnakeInitialPosition, useInterval , getNextHead,  getRandomFoodPosition } from '../lib/utils'
import GameOver from "./GameOver"

const Board = ({row,col} : boardProps) => {
    const board = generateBoard(row,col)
    const [gameOver,setGameOver] = useState<boolean>(false)
    const [gameOverMessage,setGameOverMessage] = useState("")

    const [score,setScore] = useState<number>(0)
    const [speed,setSpeed] = useState<number  | null >(250)

    const [snakeCells,setSnakeCells] = useState([getSnakeInitialPosition(board).cell])
    const [foodCell,setFoodCell] = useState(getRandomFoodPosition(board,snakeCells))

    const [head,setHead] = useState(getSnakeInitialPosition(board))

    const [direction,setDirection] = useState( DIRECTIONS.RIGHT )

    const moveSnake = (direction : DIRECTIONS) =>{
        // finding next position of head based on direction and then add new head to snake cells 
        const currentHead = { row: head.row , col : head.col }
        
        const nextHead = getNextHead( currentHead , direction ,board)
        // when next is null because snake out of board
        if(!nextHead) {
            setGameOverMessage("Snake hit the boundry 🎮 ")
            setGameOver(true)
            setSpeed(null)
            return
        }
        
        // if snake bites itself game over
        if(snakeCells.includes(nextHead.cell)){
            setGameOverMessage("Snake ate itself  🎮  ")
            setGameOver(true) 
            return 
        }
        
        // update then new head of snake
        setHead(nextHead)
        
        let newSnakeCells = snakeCells //modify this set to get new snake cell positions
       
        
        // handle case when snake does not eats  food
        if(head.cell !== foodCell){
            // remove  tail or last snake cell from snake cells 
            newSnakeCells.pop()
        }else{
            // when snake eats the food won't remove last snakeCell from array but no matter what head is added like always so length increase by 1
            setFoodCell(getRandomFoodPosition(board,snakeCells))
            setScore(score + 1)
        }

        // add new head to snakecells
       newSnakeCells = [nextHead.cell,...snakeCells ] 

        // update snakecells
        setSnakeCells(newSnakeCells) 
    }
    const handleKeyPress = (e : KeyboardEvent) =>{
        switch(e.key){
            case "ArrowRight" : 
                if(!(direction === DIRECTIONS.LEFT && snakeCells.length > 1))
                setDirection(DIRECTIONS.RIGHT)
                break 
            case "ArrowLeft" : 
            if(!(direction === DIRECTIONS.RIGHT && snakeCells.length > 1))
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
       {gameOver ?  <GameOver score={score} message={gameOverMessage} />:  
       <>
       <h2 className="score">Your score : {score}</h2>
       <div className="board">
           {board.map((row,idx) =>{ 
               return <div key={idx} className="row"> 
                    {row.map(col =>{
                        return <div data-id={col} key= {col} className={snakeCells.includes(col) ?  "cell snake" : col===foodCell ? "cell food" : "cell" } ></div>
                    })}
               </div>
           })}
        </div>
        </>}
        </>
    )
}
export default Board
