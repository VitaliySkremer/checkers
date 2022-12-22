import {Player} from "../models/Player";

interface IVinersProps {
	viners: Player;
	restart: ()=>void;
}

export const VinersComponent = ({viners,restart}:IVinersProps) => {
	return (
		<div className='form__victory'>
			<h2 className='victory__title'>победил {viners.color} игрок</h2>
			<button onClick={()=>restart()}>
				Перезапустить игру
			</button>
		</div>
	)
}