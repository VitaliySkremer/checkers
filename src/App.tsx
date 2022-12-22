import React, {useEffect, useState} from 'react';
import './App.css';
import {BoardComponent} from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import {DeathFigures} from "./components/DeathFigures";
import {VinersComponent} from "./components/VinersComponent";

function App() {
  const [whitePlayer] = useState<Player | null>(new Player(Colors.WHITE))
  const [blackPlayer] = useState<Player | null>(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [board, setBoard] = useState(new Board());

  function restartGame(){
    restart();
    setCurrentPlayer(whitePlayer);
  }

  useEffect(()=>{
    restartGame();
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
      {!board.victory.length
        ?<>
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
        </>
        :<VinersComponent viners={board.victory[0]} restartGame={restartGame}/>
      }
    </div>
  );
}

export default App;
