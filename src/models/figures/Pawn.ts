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
		if(!super.canMove(target)){
			return false;
		}
		if(this.cell.isEmptyDiagonal(target)) {
			const absX = Math.abs(target.x - this.cell.x);
			const absY = Math.abs(target.y - this.cell.y);
			const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
			return ((absX === 1 && absY === 1)&& (target.y === this.cell.y + direction))
		}

		return false
	}
}