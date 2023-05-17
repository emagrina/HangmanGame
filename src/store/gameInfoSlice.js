import { createSlice } from '@reduxjs/toolkit';

const gameInfoSlice = createSlice({
    name: 'gameInfo',
    initialState: {
        gameName: '',
        player: '',
    },
    reducers: {
        setGame: (state, action) => {
            state.gameName = action.payload.name;
            state.player = action.payload.player;
        },
    },
});

export const { setGame } = gameInfoSlice.actions;
export default gameInfoSlice.reducer;
