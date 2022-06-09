import { useState } from "react";
import './App.css';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function App() {
  
  return (
    <div className="App">
     <TicTacToe />
    </div>
  );
}

function TicTacToe() {

  const Eboard = [null,null,null,null,null,null,null,null,null];
  const [board,setBoard] = useState(Eboard);

  const decideWinner = (board) => {
       const lines = [
         [0,1,2],
         [3,4,5],
         [6,7,8],
         [0,3,6],
         [1,4,7],
         [2,4,8],
         [0,4,8],
         [2,4,6]
       ];

       for(let i=0; i< lines.length; i++){
          const [a,b,c] = lines[i];

          if(board[a]!==null && board[a]===board[b] && board[b]===board[c]){
            return `The Winner is ${board[a]}`;
          }
          else if (isBoardFull(board)){
              return `The Match is Draw`;
          }
       } 
       return null;
  };
  const winner = decideWinner(board);

  const [isXturn, setIsXturn] = useState(true);

  const handleClick= (index) => {

    if(winner === null && board[index]===null){
    const boardCopy = [...board];
    boardCopy[index] = isXturn ?"X" : "O";
    setBoard(boardCopy);
    setIsXturn(!isXturn);
  }
  
  }
  const { width, height } = useWindowSize()

     return <div className="full-game">
     {winner ? <Confetti width={width} height={height} gravity={0.05} numberOfPieces={900}	/> : ""}
            <div className="head"><h1>Tic-tac-toe</h1>
            </div>
            <h2 className="start">Start</h2>
            <div className="board">
             {board.map((val, index) => (
              <GameBox val={val} onPlayerClick={() => {handleClick(index)}} />
              ))}
              
     </div>
     
     {winner ? <h2> The winner is {winner}</h2> : ""}
     
     {winner ?<button className="btn btn-success" onClick={(index)=>{
            if(board[index]!== null && winner !== null){
                   setBoard(Eboard);
            }
     }}>Play Again</button> : ""}
     </div>
}

function GameBox({val, onPlayerClick}) {
      
  const styles={
      color: val === "X" ? "green" : "blue"
  }

  return <div onClick={() => onPlayerClick()} style={styles} className="game-box">
           {val}
  </div>
}

function isBoardFull(board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      return false;
    }
  }
  return true;
}

function Gamestatus(board){
  for(let i=0; i< board.length; i++){
    if(isBoardFull(board)===false && board[i] % 2 === 0){
       return "Its X's turn";  
  }
  else if(isBoardFull(board)===false && board[i] % 2 !== 0){
    return "Its O's turn";
  }
}
}