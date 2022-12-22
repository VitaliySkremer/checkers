import {Board} from "./Board";
import {Colors} from "./Colors";
import {Figure, FigureNames} from "./figures/Figure";
import {Queen} from "./figures/Queen";

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
		if(figure.color===Colors.BLACK && this.y === 7){
			this.figure = new Queen(Colors.BLACK, this.board.getCell(this.x, this.y));
		}
		else if(figure.color===Colors.WHITE && this.y === 0){
			this.figure = new Queen(Colors.WHITE, this.board.getCell(this.x, this.y));
		}
		else {
			this.figure = figure;
			this.figure.cell = this;
		}
	}

	moveFigure(target:Cell){
		const figureTemp = this.figure?.name;
		if(this.figure?.canMove(target)){
			this.figure?.moveFigure(target);
			target.setFigure(this.figure);
			this.figure = null;
		}

		if(Math.abs(this.x - target.x) === 2 && figureTemp===FigureNames.PAWN){
			const dx = Math.abs((this.x + target.x)/2)
			const dy = Math.abs((this.y + target.y)/2)
			this.board.addDeathFigure(this.board.getCell(dx, dy).figure!);
			this.board.getCell(dx, dy).figure = null
			return;
		}
		if(figureTemp === FigureNames.QUEEN){
			const dy = this.y < target.y ? 1 : -1;
			const dx = this.x < target.x ? 1 : -1;
			const absY = Math.abs(target.y - this.y);
			for (let i = 1; i < absY; i++) {
				const rangeX = this.x + dx * i;
				const rangeY = this.y + dy * i;
				if(!this.board.getCell(rangeX, rangeY).isEmpty()){
					this.board.addDeathFigure(this.board.getCell(rangeX, rangeY).figure!);
					this.board.getCell(rangeX, rangeY).figure = null
				}
			}

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
}