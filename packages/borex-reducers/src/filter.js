export default function filter(predicate) {
  return (state, action) => (
    state.filter((value, index) => predicate(value, action.payload, index, state, action))
  );
}
