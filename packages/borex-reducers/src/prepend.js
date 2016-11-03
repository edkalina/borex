import identity from './utils/identity';


export default function prepend(getter = identity) {
  return (state, action) => [getter(action.payload, state, action), ...state];
}
