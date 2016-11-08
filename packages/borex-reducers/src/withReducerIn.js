import inReducerWrapper from './utils/inReducerWrapper';
import withReducer from './withReducer';


export default function withReducerIn(pathStr, reducer) {
  return withReducer(inReducerWrapper(pathStr, reducer));
}
