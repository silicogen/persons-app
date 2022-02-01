import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  EntityId,
  PayloadAction
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';

import { Column, ColumnKey, Person } from './person';



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

const orderSymbols = {
  source: "",
  ascending: "↓",
  descending: "↑",
}

interface Order {
  direction: keyof typeof orderSymbols;
  column: ColumnKey;
}

export interface PersonsAdditionalStateProps {
  status: 'idle' | 'loading' | 'failed';
  order: keyof typeof orderSymbols;
};

const initialState = personsAdapter.getInitialState<PersonsAdditionalStateProps>({
  status: 'idle',
  order: "source"
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
      const ids = state.ids;
      switch (state.order) {
        case "source":
          ids.sort(compareFn);
          state.order = "ascending";
          break;
        case "ascending":
          ids.sort((a, b) => -compareFn(a, b))
          state.order = "descending";
          break;
        default:
          ids.sort(compareFn);
          state.order = "source";
      }
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

export const personsSelectors = personsAdapter.getSelectors<RootState>(state => state.persons)

export const selectTotal = personsSelectors.selectTotal;

export const selectOrderSymbol =  (state: RootState) =>
  orderSymbols[state.persons.order]

export const selectVisiblePersons = personsSelectors.selectAll;

export default personsSlice.reducer;
