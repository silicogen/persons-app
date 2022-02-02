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
import { largeUrl, smallUrl } from './urls';


export const fetchPersons = createAsyncThunk(
  'persons/fetchPersons',
  async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  }
);
export const fetchPersonsSmall = fetchPersons(smallUrl);
export const fetchPersonsLarge = fetchPersons(largeUrl);

const personsAdapter = createEntityAdapter<Person>({
  selectId: p => p.id,
  sortComparer: defaultComparier
});

const orderSymbols = {
  source: "",
  ascending: "↓",
  descending: "↑",
}

export interface PersonsAdditionalStateProps {
  status: 'idle' | 'loading' | 'failed';
  order: keyof typeof orderSymbols;
  orderColumnId?: string;
  pageIndex: number;
};

const initialState = personsAdapter
  .getInitialState<PersonsAdditionalStateProps>({
    status: 'idle',
    order: "source",
    pageIndex: 0
  });

export const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    prevPage(state) {
      state.pageIndex--;
    },
    nextPage(state) {
      state.pageIndex++;
    },
    sortByColumn(state, action: PayloadAction<Column>) {
      if (state.ids.length === 0) return;
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
        state.pageIndex = 0;
      })
  }
});

export const {
  sortByColumn,
  prevPage,
  nextPage
} = personsSlice.actions;

export const personsSelectors = personsAdapter
  .getSelectors<RootState>(state => state.persons)

export const selectTotal = personsSelectors.selectTotal;

export const selectOrderSymbol = (columnId: string) =>
  (state: RootState) =>
    state.persons.orderColumnId === columnId
      && state.persons.order !== "source"
      ? orderSymbols[state.persons.order] : "";

export const selectVisiblePersons = (state: RootState) => personsSelectors
  .selectAll(state)
  .slice(state.persons.pageIndex * 10, (state.persons.pageIndex + 1) * 10);

export const selectPagesCount = (state: RootState) =>
  selectTotal(state) === 0 ? 0 :
    Math.floor(selectTotal(state) / 10) + 1;

export const selectCurentPage = (state: RootState) =>
  selectTotal(state) === 0 ? 0 :
    state.persons.pageIndex + 1;

export const selectAllowPrevPage = (state: RootState) =>
  state.persons.pageIndex > 0;

export const selectAllowNextPage = (state: RootState) =>
  state.persons.pageIndex < selectPagesCount(state) - 1;

export default personsSlice.reducer;