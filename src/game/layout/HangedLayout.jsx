import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGameStateFailure, fetchGameStateStart, fetchGameStateSuccess } from '../../store/gameStateSlice.js';
import { useKeyPress, useGameInfo } from '../../hooks';
import { playGame, getGameState } from '../../helpers';
import Swal from 'sweetalert2';
import './HangedLayout.css';

export const HangedLayout = () => {
    const { gameName, player } = useGameInfo();
    const dispatch = useDispatch();

    // Nos mandara a crear otra partida
    const handleNewGame = () => {
        window.location.reload()
    };

    // Hace una peticion cada 2s a la API para comprobar nuevos cambios
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchGameStateStart());
            getGameState(gameName) // Pasar gameName como argumento
                .then(({ gameInfo, player }) => {
                    dispatch(fetchGameStateSuccess({ gameInfo, player }));
                })
                .catch(error => {
                    dispatch(fetchGameStateFailure(error.message));
                });
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [ dispatch, gameName ]);

    // Sacamos los datos del store para introducirlos en su sitio
    const playerTurn = useSelector(state => state.gameState.player);
    const wordCompleted = useSelector(state => state.gameState.gameInfo.wordCompleted);

    let lives = (player === 'P1')
        // eslint-disable-next-line react-hooks/rules-of-hooks
        ? useSelector(state => state.gameState.gameInfo.livesP1)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        : useSelector(state => state.gameState.gameInfo.livesP2);


    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-left',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })


    // Muestro Toasts informativos para saber si es su trno o no
    if( playerTurn === player ) {
        Toast.fire({
            icon: 'success',
            title: '✅ It\'s your turn, select a letter'
        });

    } else {
        Toast.fire({
            icon: 'error',
            title: `✋ It's not your turn, wait for player ${playerTurn} to select letter`
        });

    }

    // Controla cuando se pulsa una tecla si es valida
    const pressedKey = useKeyPress();
    useEffect(() => {
        // Verificar si es el turno del jugador y si se ha presionado una tecla
        if (playerTurn === player && pressedKey) {
            // Verificar si la tecla presionada es una letra
            const letter = pressedKey.toLowerCase();
            if (/^[a-z]$/.test(letter)) {
                // Realizar la petición a la API para enviar la letra
                playGame(gameName, letter, player);
            }
        }
    }, [playerTurn, pressedKey]);


    // Obtener el estado de vidas del otro jugador
    const opponentLives = (player === 'P1')
        // eslint-disable-next-line react-hooks/rules-of-hooks
        ? useSelector(state => state.gameState.gameInfo.livesP2)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        : useSelector(state => state.gameState.gameInfo.livesP1);

    // Verificar si uno de los jugadores ganó o perdió
    useEffect(() => {
        if (lives === 0) {
            Swal.fire({
                icon: 'error',
                title: `Player ${playerTurn} is the winner!`,
                text: `Player ${player} lost!`
            });
        } else if (opponentLives === 0) {
            Swal.fire({
                icon: 'success',
                title: `Player ${player} is the winner!`,
                text: `Player ${(playerTurn === 'P2') ? 'P1' : 'P2' } lost!`
            });
        } else if (wordCompleted === true) {
            Swal.fire({
                icon: 'success',
                title: `Player ${player} won!`,
                text: `Congratulations! You completed the word.`
            });
        }
    }, [lives, opponentLives, player, playerTurn, wordCompleted]);


    return (
        <>
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-header">
                    Game information
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Session name: <b>{ gameName }</b></li>
                    <li className="list-group-item">You are the: <b>{ player }</b></li>
                </ul>
            </div>
            <div className="main_container">
                <div className="scaffold_container">
                    <img src={ `/src/assets/monster${5 - lives}.png`} alt="hanged monster" id="monster" className="monster"/>
                </div>
                <div className="buttons_container">
                    <div id="new_game" className="button new_game" onClick={handleNewGame}>
                        <span>new game</span>
                    </div>
                    <div id="clue" className="button clue">
                        <span>Turn { playerTurn }</span>
                    </div>
                    <div className="button lives">
                        <span id="lives">{ lives }</span>
                    </div>
                </div>
                <div className="letters_container">
                    <span id="letters">{ wordCompleted }</span>
                </div>
            </div>
        </>
    );
};
