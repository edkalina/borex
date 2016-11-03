export default function sideEffectProcessor(options = {}) {
  return (store) => {
    const { dispatch, getState } = store;
    const context = { ...options.context, dispatch, getState };

    return next => action => {
      const sideEffects = action.meta && action.meta.sideEffects;

      next(action);

      if (sideEffects) {
        const creatorArgs = action.meta.creatorArgs || [];

        sideEffects.forEach(sideEffect => sideEffect(context, ...creatorArgs));
      }
    };
  };
}
