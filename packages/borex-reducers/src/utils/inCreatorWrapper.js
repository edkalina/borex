import scopeReducer from './scopeReducer';


export default function inCreatorWrapper(creator) {
  return (pathStr, ...args) => scopeReducer(pathStr, creator(...args));
}
