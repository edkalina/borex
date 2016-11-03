export default function createReducer(reducerFn) {
  const reducersByType = {};

  reducerFn((actionType, ...reducers) => {
    const prevReducers = reducersByType[actionType];
    reducersByType[actionType] = prevReducers ? [...prevReducers, ...reducers] : reducers;
  });

  return (state, action) => {
    const reducers = reducersByType[action.type];

    if (!reducers) {
      return state;
    }

    return reducers.reduce((newState, reducer) => reducer(newState, action), state);
  };
}
