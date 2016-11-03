import actionTemplateEnhancer from 'borex-action-enhancer-helpers/actionTemplateEnhancer';


export default function setType(type) {
  return actionTemplateEnhancer((actionTpl) => {
    // eslint-disable-next-line no-param-reassign
    actionTpl.type = type;
  });
}
