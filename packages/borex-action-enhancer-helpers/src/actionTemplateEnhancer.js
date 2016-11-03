import { EnhancerType, ActionTemplateEnhancer } from './symbols';


export default function actionTemplateEnhancer(fn) {
  // eslint-disable-next-line no-param-reassign
  fn[EnhancerType] = ActionTemplateEnhancer;

  return fn;
}
