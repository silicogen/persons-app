import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { smallUrl } from './urls';
import axios from 'axios';

export interface PersonsState {
  status: 'idle' | 'loading' | 'failed';
}

export const fetchPersons = createAsyncThunk(
  'persons/fetchPersons',
  async () => {
    const response = await axios.get(smallUrl);
    return response.data;
  }
);

const personsAdapter = createEntityAdapter();
const initialState = personsAdapter.getInitialState({
  status: 'idle',
  value: 0
});

export const counterSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPersons.fulfilled, (state, action) => {
        personsAdapter.setAll(state, action.payload)
        state.status = 'idle';
      })
  },
});

export const selectCount = (state: RootState) => state.persons.ids.length;
export const selectPersons = (state: RootState) => state.persons.entities;

export default counterSlice.reducer;
