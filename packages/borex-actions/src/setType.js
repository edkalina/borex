export default (type) => (actionTpl) => {
  // eslint-disable-next-line no-param-reassign
  actionTpl.type = type;
};
