import { createSlice } from '@reduxjs/toolkit';

const initialOptions = {
    'Без пересадок': false,
    '1 пересадка': false,
    '2 пересадки': false,
    '3 пересадки': false,
};

const filtersSlice = createSlice ({
    name: 'filters',
    initialState: {
        all: false,
        options: { ...initialOptions },
    },
    reducers: {
        toggleFilter (state, action) {
            const label = action.payload;
            if (label === 'Все') {
        const newValue = !state.all;
        state.all = newValue;
        Object.keys(state.options).forEach(key => {
          state.options[key] = newValue;
        });
      } else {
        state.options[label] = !state.options[label];

        const allEnabled = Object.values(state.options).every(v => v === true);
        state.all = allEnabled;
      }
    },
  },
});

export const { toggleFilter } = filtersSlice.actions;
export default filtersSlice.reducer;