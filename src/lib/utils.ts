import { useEffect, useRef } from "react"
import {data,DIRECTIONS} from "./types"

export const generateBoard = (row : number ,col : number)  : Array<Array<number>>=>  {
    let counter : number = 1
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

export const getSnakeInitialPosition = (board : Array<Array<number>>) : data =>{
    const row : number= board.length/3
    const col  : number= board[0].length/3
    const cell : number= board[row][col]
    
    return {
        row , col ,cell
    }
}

// Copied from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback : () =>void  , delay : number) {
    const savedCallback = useRef<() =>void>(callback);
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() : any=> {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  
export const isSnakeOutOfBoard = (coords:  {row:number,col:number},board: Array<Array<number>>) => {
  const {row,col} = coords 
  if(row < 0 || col < 0 || row >=board.length || col > board[0].length ) return true ;
  return false ;
}

export const getNextHead = (prevHead : {row: number,col: number}, direction : DIRECTIONS,board: Array<Array<number>>)  : any=>{

  if(direction === DIRECTIONS.RIGHT){
       const row = prevHead.row
       const col  = prevHead.col + 1 
       const cell = board[row][col]
      return { row,col,cell }
  }
  else if(direction === DIRECTIONS.LEFT){
    const row = prevHead.row
    const col  = prevHead.col - 1 
    const cell = board[row][col]
   return { row,col,cell }
}
else if(direction === DIRECTIONS.TOP){
  const row = prevHead.row - 1
  const col  = prevHead.col  
  const cell = board[row][col]
 return { row,col,cell }
}
else if(direction === DIRECTIONS.BOTTOM){
  const row = prevHead.row + 1
  const col  = prevHead.col  
  const cell = board[row][col]
 return { row,col,cell }
}
}