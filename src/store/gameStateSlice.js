import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    gameInfo: {
        livesP1: 5,
        livesP2: 5,
        wordCompleted: 'Loading...'
    },
    player: 'P1',
    loading: false,
    error: null,
};

const gameStateSlice = createSlice({
    name: 'gameState',
    initialState,
    reducers: {
        fetchGameStateStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchGameStateSuccess(state, action) {
            state.loading = false;
            state.gameInfo = action.payload.gameInfo;
            state.player = action.payload.player;
        },
        fetchGameStateFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchGameStateStart,
    fetchGameStateSuccess,
    fetchGameStateFailure,
} = gameStateSlice.actions;

export default gameStateSlice.reducer;
