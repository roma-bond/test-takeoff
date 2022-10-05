import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import contactsSlice from '../contacts/contactsSlice';
import { calculateRemainingTime } from '../../utils/utils';

type AuthState = {
  userId: number | null;
  token: string | null;
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  userId: null,
  token: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; time: string }>) => {
      state.token = action.payload.token;
      localStorage.setItem('token', state.token);
      const remainingTime = calculateRemainingTime(action.payload.time);
      setTimeout(authSlice.actions.logout, remainingTime);
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
      state.isLoggedIn = false;
    },
    setId: (state, action: PayloadAction<number | null>) => {
      state.userId = action.payload;
    },
  },
});

export const { login, logout, setId } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
