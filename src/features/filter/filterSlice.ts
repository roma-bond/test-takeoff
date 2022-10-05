import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type StateType = {
  value: string;
};

const initialState: StateType = {
  value: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
