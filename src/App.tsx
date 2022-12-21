import React, {useEffect, useState} from 'react';
import './App.css';
import {BoardComponent} from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import {DeathFigures} from "./components/DeathFigures";

function App() {
  const [whitePlayer, setWhitePlayer] = useState<Player | null>(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState<Player | null>(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [board, setBoard] = useState(new Board());

  useEffect(()=>{
    restart();
    setCurrentPlayer(whitePlayer);
  },[])

  function restart(){
    const newBoard = new Board();
    newBoard.initialCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  function swapPlayer(){
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className="App">
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div className='deathZone'>
        <DeathFigures title='Чёрные фигуры' color={Colors.BLACK} figures={board.deathBlackFigures}/>
        <DeathFigures title='Белые фигуры' color={Colors.WHITE} figures={board.deathWhiteFigures}/>
      </div>
    </div>
  );
}

export default App;
