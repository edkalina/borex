import composeReducers from 'borex-reducers/utils/composeReducers';
import counter from './counter';

const rootReducer = composeReducers(
  counter
);

export default rootReducer;
