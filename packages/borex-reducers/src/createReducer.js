import composeReducers from './composeReducers';


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

  const reducerByType = Object.keys(reducersByType).reduce((memo, type) => {
    // eslint-disable-next-line no-param-reassign
    memo[type] = composeReducers(...reducersByType[type]);

    return memo;
  }, {});

  return (state, action) => {
    const reducer = reducerByType[action.type];

    return reducer ? reducer(state, action) : state;
  };
}
