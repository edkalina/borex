import createReducerIn from 'borex-reducers/createReducerIn';
import { increment, decrement } from '../actions/CounterActions';


export default createReducerIn('counter', (on) => {
  on(increment, (state) => state + 1);
  on(decrement, (state) => state - 1);
});
