import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { addContact, deleteContact, setContacts } from './contactsSlice';
import { RootState } from '../../app/store';
import { AxiosInstance } from 'axios';
import { Contact } from '../../types/types';

export const fetchContactsAction = createAsyncThunk<
  void,
  { id: number; token: string },
  {
    dispatch: Dispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('data/fetchContacts', async ({ id, token }, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<{ contacts: Contact[] }>(
      `/api/users/${id}/contacts`
    );

    dispatch(setContacts(data.contacts));
  } catch (e) {
    dispatch(setContacts([]));
  }
});

export const addContactAction = createAsyncThunk<
  void,
  { contact: Contact; userId: number },
  {
    dispatch: Dispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>(
  'data/addContactAction',
  async ({ contact, userId }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<{ contact: Contact }>(
        `/api/users/${userId}/contacts`,
        { contact }
      );

      dispatch(addContact(data.contact));
    } catch (e) {
      // error
    }
  }
);

export const deleteContactAction = createAsyncThunk<
  void,
  { id: number; userId: number },
  {
    dispatch: Dispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>(
  'data/deleteContactAction',
  async ({ id, userId }, { dispatch, extra: api }) => {
    try {
      await api.post(`/api/users/${userId}/contacts/${id}`);

      dispatch(deleteContact(id));
    } catch (e) {
      // error
    }
  }
);
