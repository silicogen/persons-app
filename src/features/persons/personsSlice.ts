import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  EntityId,
  PayloadAction
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';

import { Column, Person } from './person';



export const fetchPersons = createAsyncThunk(
  'persons/fetchPersons',
  async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  }
);

const personsAdapter = createEntityAdapter<Person>(
  { selectId: p => p.id }
);

export interface PersonsAdditionalStateProps {
  status: 'idle' | 'loading' | 'failed';
};

const initialState = personsAdapter.getInitialState<PersonsAdditionalStateProps>({
  status: 'idle',
});

export const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    sortByColumn: (state, action: PayloadAction<Column>) => {
      const compareFn = (a: EntityId, b: EntityId) =>
        action.payload.compare(
          state.entities[a]!,
          state.entities[b]!
        );
      state.ids.sort(compareFn);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPersons.fulfilled, (state, action) => {
        personsAdapter.setAll(state, action.payload);
        state.status = 'idle';
      })
  },
});

export const {
  sortByColumn
} = personsSlice.actions;

export const selectCount = (state: RootState) => state.persons.ids.length;

const personsSelectors = personsAdapter.getSelectors<RootState>(state => state.persons)

export const selectPersonsIds = personsSelectors.selectIds;
export const selectPersonsEntities = personsSelectors.selectEntities;
export const selectPersonById =
  (state: RootState) =>
    (id: EntityId) =>
      personsSelectors.selectById(state, id);

export default personsSlice.reducer;
