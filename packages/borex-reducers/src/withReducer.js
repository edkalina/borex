export default (reducer) => (actionTpl) => {
  const prevReducer = actionTpl.meta.reducer;

  if (!prevReducer) {
    actionTpl.meta.reducer = reducer; // eslint-disable-line no-param-reassign
    return;
  }

  // eslint-disable-next-line no-param-reassign
  actionTpl.meta.reducer = (state, action) => {
    const newState = prevReducer(state, action);

    return reducer(newState, action);
  };
};
