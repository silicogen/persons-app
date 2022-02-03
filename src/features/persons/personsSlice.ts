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
import { Column, defaultComparier, columnsMap } from './columns';
import { largeUrl, smallUrl } from './urls';
import { act } from '@testing-library/react';


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
  filterStr: string;
  selectedPersonId?: EntityId;
};

const initialState = personsAdapter
  .getInitialState<PersonsAdditionalStateProps>({
    status: 'idle',
    order: "source",
    pageIndex: 0,
    filterStr: ""
  });

export const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    toggleSelect(state, action: PayloadAction<EntityId>) {
      state.selectedPersonId =
        state.selectedPersonId === action.payload
          ? undefined
          : action.payload;
    },
    filter(state, action: PayloadAction<string>) {
      state.filterStr = action.payload;
      state.pageIndex = 0;
    },
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

      state.pageIndex = 0;

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
  filter,
  sortByColumn,
  filter: setFilter,
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

export const selectVisiblePersons = (state: RootState) =>
  selectFilteredPersons(state)
    .slice(
      state.persons.pageIndex * 10,
      (state.persons.pageIndex + 1) * 10
    );

export const selectFilteredPersons = (state: RootState) => {
  const filter = state.persons.filterStr.toUpperCase();
  return personsSelectors
    .selectAll(state)
    .filter(i => Object.values(columnsMap)
      .filter(c => c
        .valueStr(i)
        .toUpperCase()
        .includes(filter)
      )
      .length > 0
    )
}

export const selectFilteredTotal = (state: RootState) =>
  selectFilteredPersons(state).length;

export const selectFilterEnabled = (state: RootState) =>
  state.persons.filterStr.length > 0;

export const selectPagesCount = (state: RootState) => {
  const count = selectFilteredTotal(state)
  return count === 0 ? 0 :
    Math.floor(count / 10) + 1;
}

export const selectFilterStr = (state: RootState) =>
  state.persons.filterStr;

export const selectCurentPage = (state: RootState) =>
  selectFilteredTotal(state) === 0 ? 0 :
    state.persons.pageIndex + 1;

export const selectAllowPrevPage = (state: RootState) =>
  state.persons.pageIndex > 0;

export const selectAllowNextPage = (state: RootState) =>
  state.persons.pageIndex < selectPagesCount(state) - 1;

export default personsSlice.reducer;