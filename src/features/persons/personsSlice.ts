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
import { defaultComparier, fieldsMap } from './fields';
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
  orderFieldId?: string;
  pageIndex: number;
  itemsPerPage: number;
  filterStr: string;
  selectedPersonId?: EntityId;
  addPersonMode: boolean;
};

const initialState = personsAdapter
  .getInitialState<PersonsAdditionalStateProps>({
    status: 'idle',
    order: "source",
    pageIndex: 0,
    itemsPerPage: 10,
    filterStr: "",
    addPersonMode: false
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
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
      state.pageIndex = 0;
    },
    toggleAddPersonsMode(state) {
      state.addPersonMode = !state.addPersonMode;
    },
    addPerson(state, action: PayloadAction<Person>) {
      personsAdapter.addOne(state, action.payload);
      state.pageIndex = 0;
      // state.addPersonMode = false
    },
    prevPage(state) {
      state.pageIndex--;
    },
    nextPage(state) {
      state.pageIndex++;
    },
    sortByField(state, action: PayloadAction<string>) {
      if (state.ids.length === 0) return;
      const person = (id: EntityId) => state.entities[id]!;
      const field = fieldsMap[action.payload];

      const compareAscending = (a: EntityId, b: EntityId) =>
        field.compare(person(a), person(b));

      const compareDescending = (a: EntityId, b: EntityId) =>
        -compareAscending(a, b);

      const compareDefault = (a: EntityId, b: EntityId) =>
        defaultComparier(person(a), person(b));

      state.pageIndex = 0;

      if (state.orderFieldId !== field.id) {
        state.orderFieldId = field.id;
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
        state.selectedPersonId = undefined;
      })
  }
});

export const {
  filter,
  sortByField,
  filter: setFilter,
  prevPage,
  nextPage,
  toggleSelect,
  setItemsPerPage,
  toggleAddPersonsMode,
  addPerson
} = personsSlice.actions;

export const personsSelectors = personsAdapter
  .getSelectors<RootState>(state => state.persons)

export const selectTotal = personsSelectors.selectTotal;
//todo reselect нужно использовать для селекторов (везде)
//так же обычно слекторы в одном файле хранятся все

export const selectOrderSymbol = (fieldId: string) =>
  (state: RootState) =>
    state.persons.orderFieldId === fieldId
      && state.persons.order !== "source"
      ? orderSymbols[state.persons.order] : "";

export const selectIsSelectedPerson = (id: EntityId) =>
  (state: RootState) =>
    state.persons.selectedPersonId === id;

export const selectSelectedPerson = (state: RootState) =>
  state.persons.selectedPersonId === undefined ? undefined :
    personsSelectors.selectById(state, state.persons.selectedPersonId)
  ;

export const selectSelectedPersonId = (state: RootState) =>
  state.persons.selectedPersonId;

export const selectAddPersonMode = (state: RootState) =>
  state.persons.addPersonMode;

export const selectVisiblePersons = (state: RootState) =>
  selectFilteredPersons(state)
    .slice(
      state.persons.pageIndex * state.persons.itemsPerPage,
      (state.persons.pageIndex + 1) * state.persons.itemsPerPage
    );

export const selectFilteredPersons = (state: RootState) => {
  const filter = state.persons.filterStr.toUpperCase();
  return personsSelectors
    .selectAll(state)
    .filter(i => Object.values(fieldsMap)
      .filter(c => c
        .valueString(i)
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
    Math.floor(count / state.persons.itemsPerPage) + 1;
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
