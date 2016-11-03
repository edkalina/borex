import { EnhancerType, ActionEnhancer } from './symbols';


export default function actionEnhancer(fn) {
  // eslint-disable-next-line no-param-reassign
  fn[EnhancerType] = ActionEnhancer;

  return fn;
}
