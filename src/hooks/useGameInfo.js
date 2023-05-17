import { useDispatch, useSelector } from 'react-redux';
import { setGame } from '../store/gameInfoSlice';

export const useGameInfo = () => {
    const dispatch = useDispatch();
    const gameName = useSelector((state) => state.gameInfo.gameName);
    const player = useSelector((state) => state.gameInfo.player);

    const setGameInfo = (name, player) => {
        dispatch(setGame({ name, player }));
    };

    return { gameName, player, setGame: setGameInfo };
};
