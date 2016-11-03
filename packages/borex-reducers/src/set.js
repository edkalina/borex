import identity from './utils/identity';


export default function set(setFn = identity) {
  return (state, action) => setFn(action.payload, state, action);
}
