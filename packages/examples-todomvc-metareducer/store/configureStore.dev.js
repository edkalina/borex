import { createStore, compose } from 'redux';
import { persistState } from 'redux-devtools';
import createMetaReducer from 'borex-reducers/createMetaReducer';
import DevTools from '../containers/DevTools';

const enhancer = compose(
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function configureStore(initialState) {
  return createStore(createMetaReducer(), initialState, enhancer);
}
