import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (_, { rejectWithValue }) => {
    try {
      const searchRes = await fetch('https://aviasales-test-api.kata.academy/search');
      if (!searchRes.ok) {
        throw new Error(`Ошибка при получении searchId: ${searchRes.status}`);
      }
      const { searchId } = await searchRes.json();

      const allTickets = [];
      let stop = false;
      let retries = 0;

      while (!stop && retries < 5) {
        try {
          const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          allTickets.push(...data.tickets);
          stop = data.stop;
        } catch (err) {
          retries++;
          console.error('Retrying fetch due to error:', err.message);
        }
      }

      return allTickets;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
); // ← вот здесь была забыта закрывающая скобка

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default ticketsSlice.reducer;
