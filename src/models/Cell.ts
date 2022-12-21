import {Board} from "./Board";
import {Colors} from "./Colors";
import {Figure} from "./figures/Figure";

export class Cell {
	readonly x: number;
	readonly y: number;
	readonly color: Colors;
	figure: Figure | null;
	board: Board;
	available: boolean;
	id: string;


	constructor(board: Board, x:number, y:number, color: Colors, figure: Figure | null) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.figure = figure;
		this.board = board;
		this.available = false;
		this.id = Math.random().toString(7);
	}

	setFigure(figure:Figure){
		this.figure = figure;
		this.figure.cell = this;
	}

	moveFigure(target:Cell){
		if(this.figure?.canMove(target)){
			this.figure?.moveFigure(target);
			target.setFigure(this.figure);
			this.figure = null;
		}
		if(Math.abs(this.x - target.x) === 2){
			const dx = Math.abs((this.x + target.x)/2)
			const dy = Math.abs((this.y + target.y)/2)
			this.board.addDeathFigure(this.board.getCell(dx, dy).figure!);
			this.board.getCell(dx, dy).figure = null
		}
	}


	isEmpty():boolean {
		return this.figure === null;
	}

	isEnemy(target: Cell):boolean{
		if(target.figure){
			return this.figure?.color !== target.figure.color;
		}
		return false;
	}

	isKill(target: Cell):boolean {
		return this.board.getCell((target.x + this.x) / 2, (target.y + this.y) / 2).isEnemy(this) && !this.board.getCell((target.x + this.x) / 2, (target.y + this.y) / 2).isEmpty()
	}

	isEmptyDiagonal(target: Cell): boolean{
		const absX = Math.abs(target.x - this.x);
		const absY = Math.abs(target.y - this.y);
		if(absY !== absX) {
			return false;
		}
		const dy = this.y < target.y ? 1 : -1;
		const dx = this.x < target.x ? 1 : -1;

		for (let i = 1; i <= absY; i++) {
			if(!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()){
				return false;
			}
		}

		return false
	}
}