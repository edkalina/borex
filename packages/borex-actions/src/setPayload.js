export default (fn) => () => (action, ...args) => {
  // eslint-disable-next-line no-param-reassign
  action.payload = fn(...args);
};
