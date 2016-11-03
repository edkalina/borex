import actionTemplateEnhancer from 'borex-action-enhancer-helpers/actionTemplateEnhancer';


export default function withReducer(reducer) {
  return actionTemplateEnhancer((actionTpl) => {
    const prevReducer = actionTpl.meta.reducer;

    if (!prevReducer) {
      actionTpl.meta.reducer = reducer; // eslint-disable-line no-param-reassign
      return;
    }

    // eslint-disable-next-line no-param-reassign
    actionTpl.meta.reducer = (atom, payload, action) => {
      const newAtom = prevReducer(atom, action);

      return reducer(newAtom, action);
    };
  });
}
