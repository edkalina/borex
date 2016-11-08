import actionCreator from './actionCreator';
import withSideEffect from './withSideEffect';
import setMetaStatic from './setMetaStatic';


export default function commandCreator(command) {
  return actionCreator(
    withSideEffect(command),
    setMetaStatic('sideEffectsOnly', true)
  );
}
