import {Player} from "../models/Player";

interface IVinersProps {
	viners: Player;
	restartGame:()=>void;
}

export const VinersComponent = ({viners,restartGame}:IVinersProps) => {
	return (
		<div className='form__victory'>
			<h2 className='victory__title'>победил {viners.color} игрок</h2>
			<button onClick={()=>restartGame()}>
				Перезапустить игру
			</button>
		</div>
	)
}