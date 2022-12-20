import {CellComponent} from "./CellComponent";
import {Board} from "../models/Board";
import React, {useEffect, useState} from "react";
import {Cell} from "../models/Cell";

interface BoardProps{
	board: Board;
	setBoard: (board: Board)=>void;
}

export const BoardComponent = ({board, setBoard}: BoardProps) => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

	function clickCell(cell: Cell){
		if(selectedCell && selectedCell!==cell && selectedCell.figure?.canMove(cell)){
			selectedCell.moveFigure(cell);
			setSelectedCell(null);
		}
		else if(cell.figure) {
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
	)
}