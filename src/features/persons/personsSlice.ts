import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  EntityId,
  PayloadAction
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
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
    sortByColumn: (state, action: PayloadAction<string>) => {
      const columnName = action.payload;

      const compareFn = (a: EntityId, b: EntityId) => {
        const entA = state.entities[a]!;
        const entB = state.entities[b]!;
        return entA.firstName
          .localeCompare(entB.firstName);
      }

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
