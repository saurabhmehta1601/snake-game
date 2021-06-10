import { useEffect, useRef } from "react"
import {data} from "./types"

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
  