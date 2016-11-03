import actionTemplateEnhancer from 'borex-action-enhancer-helpers/actionTemplateEnhancer';


export default function withSideEffect(sideEffect) {
  return actionTemplateEnhancer((actionTpl) => {
    if (!actionTpl.meta.sideEffects) {
      // eslint-disable-next-line no-param-reassign
      actionTpl.meta.sideEffects = [];
    }

    actionTpl.meta.sideEffects.push(sideEffect);
  });
}
