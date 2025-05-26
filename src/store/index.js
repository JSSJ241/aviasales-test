import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../components/Filters/filtersSlice';
import sortReducer from '../components/SortTabs/sortSlice';
import ticketsReducer from '../components/Tickets/ticketsSlice'

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    sort: sortReducer,
    tickets: ticketsReducer,
  },
  devTools: true,
});