/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import actionEnhancer from '../actionEnhancer';
import { EnhancerType, ActionEnhancer } from '../symbols';


it('`actionEnhancer` should work', () => {
  const fn = jest.fn();
  const enhancer = actionEnhancer(fn);

  expect(enhancer).toBe(fn);
  expect(enhancer[EnhancerType]).toBe(ActionEnhancer);
});
