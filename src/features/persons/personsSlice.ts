import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  EntityId,
  PayloadAction
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';

import { Person } from './person';
import { Column, defaultComparier } from './columns';


export const fetchPersons = createAsyncThunk(
  'persons/fetchPersons',
  async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  }
);

const personsAdapter = createEntityAdapter<Person>(
  { selectId: p => p.id, sortComparer: defaultComparier }
);

const orderSymbols = {
  source: "",
  ascending: "↓",
  descending: "↑",
}

export interface PersonsAdditionalStateProps {
  status: 'idle' | 'loading' | 'failed';
  order: keyof typeof orderSymbols;
  orderColumnId?: string;
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
      const person = (id: EntityId) => state.entities[id]!;
      const column = action.payload;

      const compareAscending = (a: EntityId, b: EntityId) =>
      column.compare(person(a), person(b));

      const compareDescending = (a: EntityId, b: EntityId) =>
        -compareAscending(a, b);

      const compareDefault = (a: EntityId, b: EntityId) =>
        defaultComparier(person(a), person(b));

      if (state.orderColumnId !== column.id) {
        state.orderColumnId = column.id;
        state.order = "source";
      }

      switch (state.order) {
        case "source":
          state.ids.sort(compareAscending);
          state.order = "ascending";
          break;
        case "ascending":
          state.ids.sort(compareDescending)
          state.order = "descending";
          break;
        default:
          state.ids.sort(compareDefault);
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
        state.order = "source";
      })
  },
});

export const {
  sortByColumn
} = personsSlice.actions;

export const personsSelectors = personsAdapter
  .getSelectors<RootState>(state => state.persons)

export const selectTotal = personsSelectors.selectTotal;

export const selectOrderSymbol = (columnId: string) =>
  (state: RootState) =>
    state.persons.orderColumnId === columnId
      && state.persons.order !== "source"
      ? orderSymbols[state.persons.order] : "";

export const selectVisiblePersons = personsSelectors.selectAll;

export default personsSlice.reducer;
