import actionTemplateEnhancer from 'borex-action-enhancer-helpers/actionTemplateEnhancer';


export default function setMetaStatic(field, value) {
  return actionTemplateEnhancer((actionTpl) => {
    // eslint-disable-next-line no-param-reassign
    actionTpl.meta[field] = value;
  });
}
