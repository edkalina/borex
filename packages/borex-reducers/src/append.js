import identity from './utils/identity';


export default function append(getter = identity) {
  return (state, action) => [...state, getter(action.payload, state, action)];
}
