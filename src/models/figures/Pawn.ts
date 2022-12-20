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
		const direction = this?.color === Colors.BLACK ? 1 : -1;
		if(!super.canMove(target)){
			return false;
		}
		if(target.figure) return false
		if(absY !== absX) {
			return false;
		}
		if(absY === 2 && this.cell.isKill(target)) {
			return true
		}
		if(target.y === this.cell.y + direction){
			return true
		}
		return false
	}
}