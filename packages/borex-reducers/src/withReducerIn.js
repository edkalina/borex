import inReducerWrapper from './utils/scopeReducer';
import withReducer from './withReducer';


export default function withReducerIn(pathStr, reducer) {
  return withReducer(inReducerWrapper(pathStr, reducer));
}
