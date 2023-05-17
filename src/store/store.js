import { configureStore } from '@reduxjs/toolkit';
import gameInfoReducer from './gameInfoSlice';
import gameStateReducer from './gameStateSlice';

const store = configureStore({
    reducer: {
        gameInfo: gameInfoReducer,
        gameState: gameStateReducer,
    },
});

export default store;
