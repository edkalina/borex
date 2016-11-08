export default (field, value) => (actionTpl) => {
  // eslint-disable-next-line no-param-reassign
  actionTpl.meta[field] = value;
};
