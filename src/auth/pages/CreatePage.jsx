import { useState } from 'react';
import { createGame } from '../../helpers';
import { useGameInfo } from '../../hooks';

// eslint-disable-next-line react/prop-types
export const CreatePage = ({ onCreateOrJoin }) => {
    const [gameNameLocal, setGameNameLocal] = useState('');
    const [gamePassword, setGamePassword] = useState('');
    const { setGame } = useGameInfo();

    const handleNameChange = (event) => {
        const newName = event.target.value;
        setGameNameLocal(newName);
        setGame(newName, 'P1');
    };

    const handlePasswordChange = (event) => {
        setGamePassword(event.target.value);
    };

    const handleCreateClick = async () => {
        const data = await createGame(gameNameLocal, gamePassword);
        onCreateOrJoin(data);
    };

    const isButtonDisabled = gameNameLocal.length < 3 || gamePassword.length < 3;

    return (
        <div className="form px-4">
            <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={gameNameLocal}
                onChange={handleNameChange}
            />
            <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={gamePassword}
                onChange={handlePasswordChange}
            />
            <button
                className="btn btn-dark btn-block"
                onClick={handleCreateClick}
                disabled={isButtonDisabled}
            >
                🦑 Create
            </button>
        </div>
    );
};
