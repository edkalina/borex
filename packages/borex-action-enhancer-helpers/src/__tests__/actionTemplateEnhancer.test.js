/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import actionTemplateEnhancer from '../actionTemplateEnhancer';
import { EnhancerType, ActionTemplateEnhancer } from '../symbols';


it('`actionEnhancer` should work', () => {
  const fn = jest.fn();
  const enhancer = actionTemplateEnhancer(fn);

  expect(enhancer).toBe(fn);
  expect(enhancer[EnhancerType]).toBe(ActionTemplateEnhancer);
});
