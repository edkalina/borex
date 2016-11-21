import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import sideEffectProcessor from 'borex-actions/sideEffectProcessor';
import createMetaReducer from 'borex-reducers/createMetaReducer';
import DevTools from '../containers/DevTools';

const enhancer = compose(
  applyMiddleware(sideEffectProcessor()),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);
const rootReducer = createMetaReducer();

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
