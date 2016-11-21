import composeReducers from 'borex-reducers/utils/composeReducers';
import scopeReducer from 'borex-reducers/utils/scopeReducer';
import todos from './todos';

const rootReducer = composeReducers(
  scopeReducer('todos', todos),
);

export default rootReducer;
