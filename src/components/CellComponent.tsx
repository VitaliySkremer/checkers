import {Cell} from "../models/Cell";

interface CellProps{
	cell: Cell;
	selected:boolean;
	click:(cell:Cell)=> void;
}

export const CellComponent = ({cell, selected, click}:CellProps) => {
	return (
		<div
			className={['cell', cell.color, selected ? 'selected': ''].join(' ')}
			onClick={()=>click(cell)}
			style={{backgroundColor: cell.figure && cell.available ? 'green':''}}
		>
			{!cell.figure && cell.available && <i className='available'/>}
			{cell.figure?.logo && <div className={cell.figure.logo}/>}
		</div>
	)
}