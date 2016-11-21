import { createStore } from 'redux';
import createMetaReducer from 'borex-reducers/createMetaReducer';

export default function configureStore(initialState) {
  return createStore(createMetaReducer(), initialState);
}
