import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import contactsSlice from '../features/contacts/contactsSlice';
import authSlice from '../features/auth/authSlice';
import filterSlice from '../features/filter/filterSlice';
import { createAPI } from './api';

export const api = createAPI((message: string) => {
  console.log(message);
});

export const store = configureStore({
  reducer: {
    auth: authSlice,
    contacts: contactsSlice,
    filter: filterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
