import {Cell} from "../models/Cell";
import {useState} from "react";

interface CellProps{
	cell: Cell;
	selected:boolean;
	click:(cell:Cell)=> void;
}

export const CellComponent = ({cell, selected, click}:CellProps) => {

	const [drugHover, setDrugHover] = useState(false);
	const onDragOver = (event: React.MouseEvent)=>{
		if(cell.available){
			event.preventDefault();
		}
	}

	const onDrop = () =>{
		click(cell);
		setDrugHover(false);
	}

	return (
		<div
			className={['cell', cell.color, selected ? 'selected': '', drugHover && cell.available?'drug__hover':''].join(' ')}
			onDrag={()=>click(cell)}
			onDrop={onDrop}
			onDragOver={onDragOver}
			draggable={!!cell.figure?.logo}
			onDragEnter={()=>setDrugHover(true)}
			onDragLeave={()=>setDrugHover(false)}
			style={{backgroundColor: cell.figure && cell.available ? 'green':''}}
		>
			{!cell.figure && cell.available && <i className='available'/>}
			{cell.figure?.logo && <div className={cell.figure.logo}/>}
		</div>
	)
}