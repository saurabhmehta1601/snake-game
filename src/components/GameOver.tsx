type props = {
    score:number,message : string
}


const GameOver : React.FC<props>= (props ) => {
    return (
        <div className="game-over">
            <h2>Game Over</h2>
            <p>{props.message}</p>
            <h3>Your Score : {props.score}</h3>
        </div>
    )
}

export default GameOver
