import inReducerWrapper from 'borex-reducer-in-helpers/inReducerWrapper';
import withReducer from './withReducer';


export default function withReducerIn(pathStr, reducer) {
  return withReducer(inReducerWrapper(pathStr, reducer));
}
