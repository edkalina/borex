export default function reject(predicate) {
  return (state, action) => (
    state.filter((value, index) => !predicate(value, action.payload, index, state, action))
  );
}
