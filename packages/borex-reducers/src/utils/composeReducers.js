export default function composeReducers(...reducers) {
  if (reducers.length === 0) {
    throw new Error('composeReducers: at least one reducer should be specified');
  }

  if (reducers.length === 1) {
    return reducers[0];
  }

  return (state, action) =>
    reducers.reduce((newState, reducer) => reducer(newState, action), state);
}
