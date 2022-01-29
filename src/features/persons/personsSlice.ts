import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { smallUrl } from './urls';
import axios from 'axios';

export interface PersonsState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

export const incrementAsync = createAsyncThunk(
  'persons/fetchCount',
  async () => {
    const r = await axios.get(smallUrl);
    return r.data;
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
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        personsAdapter.setAll(state, action.payload)
        state.status = 'idle';
      })
  },
});

export const selectCount = (state: RootState) => state.persons.ids.length;

export default counterSlice.reducer;
