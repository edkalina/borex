export default (field, fn) => () => (action, ...args) => {
  // eslint-disable-next-line no-param-reassign
  action.meta[field] = fn(...args);
};
