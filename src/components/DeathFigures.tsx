import {Figure} from "../models/figures/Figure";
import {Colors} from "../models/Colors";

interface IDeathFiguresProps {
	title: string;
	figures:Figure[];
	color: Colors
}

export const DeathFigures = ({title, figures,color}:IDeathFiguresProps) => {
	return (
		<div className='death'>
			<h3>{title} &nbsp;</h3>
			<span>x {figures.length}</span>
		</div>
	)
}