import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { smallUrl } from './urls';
import axios from 'axios';

export interface Address {
  streetAddress: string,
  city: string,
  state: string,
  zip: string,
}

export interface Person {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: Address,
  description: string
}

export interface PersonsAdditionalStateProps {
  status: 'idle' | 'loading' | 'failed';
}

export const fetchPersons = createAsyncThunk(
  'persons/fetchPersons',
  async () => {
    const response = await axios.get(smallUrl);
    return response.data;
  }
);

const personsAdapter = createEntityAdapter<Person>(
  { selectId: p => p.id }
);
const initialState = personsAdapter.getInitialState<PersonsAdditionalStateProps>({
  status: 'idle',
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

const globalizedSelectors = personsAdapter.getSelectors<RootState>
  (s => s.persons)
export const selectPersons0 =

  personsAdapter.getSelectors().selectAll;

export const selectPersons = globalizedSelectors.selectAll;


// export const selectPersons0 = (state: RootState) => state.persons.entities;

export default counterSlice.reducer;
