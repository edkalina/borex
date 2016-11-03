import actionEnhancer from 'borex-action-enhancer-helpers/actionEnhancer';


export default function setMeta(field, fn) {
  return actionEnhancer((action, ...args) => {
    // eslint-disable-next-line no-param-reassign
    action.meta[field] = fn(...args);
  });
}
