import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Pawn} from "./figures/Pawn";

export class Board {
	cells: Cell[][] = [];

	public initialCells() {
		for (let i = 0; i < 8; i++){
			const row: Cell[] = [];
			for(let j = 0 ; j < 8; j++){
				if((i+j) % 2 !==0) row.push(new Cell(this, j, i, Colors.BLACK, null ))
				else row.push(new Cell(this, j, i, Colors.WHITE, null ))
			}
			this.cells.push(row)
		}
	}

	public getCoptBoard():Board{
		const newBoard = new Board();
		newBoard.cells = this.cells;
		return newBoard;
	}

	public highLightCells(select: Cell | null){
		for(let i=0; i< this.cells.length; i++){
			const row = this.cells[i];
			for (let j = 0; j < row.length; j++) {
				const target = row[j];
				target.available = !!select?.figure?.canMove(target)
			}
		}
	}

	public getCell(x:number, y:number){
		return this.cells[x][y];
	}

	private addPawns() {
		for (let i = 0; i < 8; i++){
			if(i % 2!==0) {
				new Pawn(Colors.BLACK, this.getCell(0, i));
				new Pawn(Colors.WHITE, this.getCell(6, i));
				new Pawn(Colors.BLACK, this.getCell(2, i));
			}
			else {
				new Pawn(Colors.WHITE, this.getCell(7, i));
				new Pawn(Colors.BLACK, this.getCell(1, i));
				new Pawn(Colors.WHITE, this.getCell(5, i));
			}
		}
	}

	public addFigures() {
		this.addPawns();
	}
}