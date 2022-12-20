import {Colors} from "../Colors";
import {Cell} from "../Cell";

export enum FigureNames {
	FIGURE = 'FIGURE',
	PAWN = 'PAWN',
	QUEEN = 'QUEEN',
}

export class Figure {
	color: Colors;
	cell: Cell;
	logo: string | null;
	name:FigureNames;
	id: string;


	constructor(color: Colors, cell: Cell) {
		this.color = color;
		this.cell = cell;
		this.cell.figure = this;
		this.logo = null;
		this.name = FigureNames.FIGURE;
		this.id = Math.random().toString(7)
	}

	canMove(target: Cell):boolean{
		return target.figure?.color !== this.color;
	}

	moveFigure(target: Cell){}
}