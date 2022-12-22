import {Cell} from "../Cell";
import {Colors} from "../Colors";
import {Figure, FigureNames} from "./Figure";

export class Queen extends Figure {

	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.BLACK ? 'queen__black': 'queen__white';
		this.name = FigureNames.QUEEN;
	}

	canMove(target: Cell): boolean {
		const absX = Math.abs(target.x - this.cell.x);
		const absY = Math.abs(target.y - this.cell.y);
		const direction = this?.color === Colors.BLACK ? 1 : -1;
		if (!super.canMove(target)) {
			return false;
		}
		if (target.figure) return false

		if (absY !== absX) {
			return false;
		}

		const dy = this.cell.y < target.y ? 1 : -1;
		const dx = this.cell.x < target.x ? 1 : -1;

		let countEnemy = 0;
		for (let i = 1; i < absY; i++) {
			if(!this.cell.board.getCell(this.cell.x + dx * i, this.cell.y + dy * i).isEmpty()){
				countEnemy++;
			}
			if(this.cell.board.getCell(this.cell.x + dx * i, this.cell.y + dy * i).figure?.color === this.cell.figure?.color){
				return false
			}
			if (countEnemy >= 2){
				return false;
			}
		}

		return true
	}
}