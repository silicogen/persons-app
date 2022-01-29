import counterReducer, {
  PersonsState,

} from './personsSlice';

describe('counter reducer', () => {
  const initialState: PersonsState = {
    value: 3,
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
    });
  });
});
