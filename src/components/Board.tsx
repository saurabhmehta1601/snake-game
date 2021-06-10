import {boardProps} from "../lib/types"
import { generateBoard } from '../lib/utils'

// enum DIRECTIONS { TOP,RIGHT,LEFT,BOTTOM }

const Board = ({row,col} : boardProps) => {
    const board = generateBoard(row,col)
    

    return (
        <div className="board">
           {board.map((row,idx) =>{
               return <div key={idx} className="row"> 
                    {row.map(col =>{
                        return <div data-id={col} key= {col} className={"cell"} ></div>
                    })}
               </div>
           })}
        </div>
    )
}

export default Board
