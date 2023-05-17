import { useState } from 'react';
import { useGameInfo } from '../../hooks';
import { useJoinGame } from '../../hooks/useJoinGame.js';

// eslint-disable-next-line react/prop-types
export const JoinPage = ({ onCreateOrJoin }) => {
    const { joinGame } = useJoinGame();
    const [gameNameLocal, setGameNameLocal] = useState('');
    const { setGame } = useGameInfo();

    const handleNameChange = (event) => {
        setGameNameLocal(event.target.value);
        setGame(gameNameLocal, 'P2');
    };

    const handleJoinClick = async () => {
        const data = await joinGame(gameNameLocal);
        setGame(gameNameLocal, 'P2');
        onCreateOrJoin(data);
    };

    const isButtonDisabled = gameNameLocal.length < 3;

    return (
        <div className="form px-4 pt-5">
            <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={gameNameLocal}
                onChange={handleNameChange}
            />
            <button
                className="btn btn-dark btn-block"
                onClick={handleJoinClick}
                disabled={isButtonDisabled}
            >
                🦄 Join
            </button>
        </div>
    );
};
