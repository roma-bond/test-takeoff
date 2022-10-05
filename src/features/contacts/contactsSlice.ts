import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Contact } from '../../types/types';

type StateType = {
  value: Contact[];
};

const initialState: StateType = {
  value: [],
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.value.push(action.payload);
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(
        (contact) => contact.id !== action.payload
      );
    },
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.value = action.payload;
    },
  },
});

export const { addContact, deleteContact, setContacts } = contactsSlice.actions;

export const selectContacts = (state: RootState) => state.contacts;

export default contactsSlice.reducer;
