import { createStore, applyMiddleware } from 'redux';
import sideEffectProcessor from 'borex-actions/sideEffectProcessor';
import rootReducer from '../reducers';

const enhancer = applyMiddleware(sideEffectProcessor);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
