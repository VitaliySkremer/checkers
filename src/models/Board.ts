import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Pawn} from "./figures/Pawn";
import {Figure} from "./figures/Figure";

export class Board {
	cells: Cell[][] = [];
	deathWhiteFigures: Figure[] = [];
	deathBlackFigures: Figure[] = [];

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

	addDeathFigure(figure:Figure){
		figure.color === Colors.BLACK
			? this.deathBlackFigures.push(figure)
			: this.deathWhiteFigures.push(figure)
	}

	public getCopyBoard():Board{
		const newBoard = new Board();
		newBoard.cells = this.cells;
		newBoard.deathWhiteFigures = this.deathWhiteFigures;
		newBoard.deathBlackFigures = this.deathBlackFigures;
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
		return this.cells[y][x];
	}

	private addPawns() {
		for (let i = 0; i < 8; i++){
			if(i % 2!==0) {
				new Pawn(Colors.BLACK, this.getCell(i, 0));
				new Pawn(Colors.WHITE, this.getCell(i, 6));
				 new Pawn(Colors.BLACK, this.getCell(i, 2));
			}
			else {
				 new Pawn(Colors.WHITE, this.getCell(i, 7));
				 new Pawn(Colors.BLACK, this.getCell(i, 1));
				 new Pawn(Colors.WHITE, this.getCell(i, 5));
			}
		}
	}

	public addFigures() {
		this.addPawns();
	}
}