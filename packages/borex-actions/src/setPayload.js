import actionEnhancer from 'borex-action-enhancer-helpers/actionEnhancer';


export default function setPayload(fn) {
  return actionEnhancer((action, ...args) => {
    // eslint-disable-next-line no-param-reassign
    action.payload = fn(...args);
  });
}
