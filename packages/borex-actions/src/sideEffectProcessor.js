export default function sideEffectProcessor(options = {}) {
  return (store) => {
    const { dispatch, getState } = store;
    const context = { ...options.context, dispatch, getState };

    return next => action => {
      const sideEffects = action.meta && action.meta.sideEffects;
      const sideEffectsOnly = action.meta && action.meta.sideEffectsOnly;

      if (!sideEffectsOnly) {
        next(action);
      }

      if (sideEffects && sideEffects.length > 0) {
        const creatorArgs = action.meta.creatorArgs || [];

        sideEffects.forEach(sideEffect => sideEffect(context, ...creatorArgs));
      }
    };
  };
}
