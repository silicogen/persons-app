import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { smallUrl } from './urls';
import axios from 'axios';

export interface PersonsState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PersonsState = {
  value: 0,
  status: 'idle',
};

export const incrementAsync = createAsyncThunk(
  'persons/fetchCount',
  async () => {
    const r = await axios.get(smallUrl);
    return r.data.length;
  }
);

export const counterSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
        state.value = 0;
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
  },
});

export const selectCount = (state: RootState) => state.persons.value;

export default counterSlice.reducer;
