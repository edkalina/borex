export default function createReducer(reducerFn) {
  const reducersByType = {};

  function registerReducers(type, reducers) {
    const prevReducers = reducersByType[type];
    reducersByType[type] = prevReducers ? [...prevReducers, ...reducers] : reducers;
  }

  reducerFn((actionType, ...reducers) => {
    if (Array.isArray(actionType)) {
      actionType.forEach((type) => registerReducers(type, reducers));
      return;
    }

    registerReducers(actionType, reducers);
  });

  return (state, action) => {
    const reducers = reducersByType[action.type];

    if (!reducers) {
      return state;
    }

    return reducers.reduce((newState, reducer) => reducer(newState, action), state);
  };
}
