import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {BoardComponent} from "./components/BoardComponent";
import {Board} from "./models/Board";

function App() {

  const [board, setBoard] = useState(new Board());

  useEffect(()=>{
    restart();
  },[])

  function restart(){
    const newBoard = new Board();
    newBoard.initialCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  return (
    <div className="App">
      <BoardComponent board={board} setBoard={setBoard}/>
    </div>
  );
}

export default App;
