import inReducerWrapper from './inReducerWrapper';


export default function inCreatorWrapper(creator) {
  return (pathStr, ...args) => inReducerWrapper(pathStr, creator(...args));
}
