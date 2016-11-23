import { createStore, applyMiddleware } from 'redux';
import sideEffectProcessor from 'borex-actions/sideEffectProcessor';
import createMetaReducer from 'borex-reducers/createMetaReducer';

const enhancer = applyMiddleware(sideEffectProcessor());
const rootReducer = createMetaReducer();

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
