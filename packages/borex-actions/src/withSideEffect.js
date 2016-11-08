export default (sideEffect) => (actionTpl) => {
  if (!actionTpl.meta.sideEffects) {
    // eslint-disable-next-line no-param-reassign
    actionTpl.meta.sideEffects = [];
  }

  actionTpl.meta.sideEffects.push(sideEffect);
};
