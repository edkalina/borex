function applyMetaReducer(state, action) {
  const metaReducer = action.meta && action.meta.reducer;

  return metaReducer ? metaReducer(state, action.payload, action) : state;
}

export default function createMetaReducer(reducer) {
  if (!reducer) {
    return applyMetaReducer;
  }

  return (state, action) => reducer(applyMetaReducer(state, action), action.payload, action);
}
