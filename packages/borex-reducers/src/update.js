import identity from './utils/identity';


export default function update(updateFn = identity) {
  return (state, action) => ({
    ...state,
    ...updateFn(action.payload, state, action),
  });
}
