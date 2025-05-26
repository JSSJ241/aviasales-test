import { createSlice } from '@reduxjs/toolkit';

const initialState = 'cheap';

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSortType: (state, action ) => action.payload
    }
});

export const {setSortType} = sortSlice.actions;
export default sortSlice.reducer;