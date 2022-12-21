import {CellComponent} from "./CellComponent";
import {Board} from "../models/Board";
import React, {useEffect, useState} from "react";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface BoardProps{
	board: Board;
	setBoard: (board: Board)=>void;
	currentPlayer: Player | null;
	swapPlayer:()=>void;
}

export const BoardComponent = ({board, setBoard,currentPlayer, swapPlayer}: BoardProps) => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

	function clickCell(cell: Cell){
		if(selectedCell && selectedCell!==cell && selectedCell.figure?.canMove(cell)){
			selectedCell.moveFigure(cell);
			setSelectedCell(null);
			swapPlayer();
		}
		else if(cell.figure && cell.figure.color === currentPlayer?.color) {
			setSelectedCell(cell);
		}
	}

	useEffect(()=>{
		highLightCells();
	},[selectedCell])

	function highLightCells() {
		board.highLightCells(selectedCell);
		updateBoard();
	}

	function updateBoard() {
		const newBoard = board.getCopyBoard();
		setBoard(newBoard);
	}

	return (
		<div>
			<h2 style={{textAlign:'center',marginBottom:'10px', fontSize:'40px'}}>Ход {currentPlayer?.color===Colors.WHITE? 'белого':'чёрного'} игрока</h2>
			<div className='board'>
				{board.cells.map((row, index)=>
					<React.Fragment key={index}>
						{row.map(cell=>
							<CellComponent
								click = {clickCell}
								selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
								key={cell.id}
								cell={cell}
							/>
						)}
					</React.Fragment>
				)}
			</div>
		</div>
	)
}