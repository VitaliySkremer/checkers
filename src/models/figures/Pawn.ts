import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";

export class Pawn extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.BLACK ? 'pawn__black': 'pawn__white';
		this.name = FigureNames.PAWN;
	}

	canMove(target: Cell): boolean {
		const absX = Math.abs(target.x - this.cell.x);
		const absY = Math.abs(target.y - this.cell.y);
		const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;

		if(!super.canMove(target)){
			return false;
		}
		if(this.cell.isEmptyDiagonal(target)) {
			 return true
		}

		return false
	}
}