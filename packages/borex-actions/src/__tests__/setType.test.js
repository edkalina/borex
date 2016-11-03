/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import { EnhancerType, ActionTemplateEnhancer } from 'borex-action-enhancer-helpers/symbols';
import setType from '../setType';


const TestType = 'testType';

describe('`setType`', () => {
  it('should return ActionTemplateEnhancer', () => {
    const enhancer = setType(TestType);

    expect(enhancer).toBeInstanceOf(Function);
    expect(enhancer[EnhancerType]).toBe(ActionTemplateEnhancer);
  });

  it('should set `type`', () => {
    const enhancer = setType(TestType);
    const template = {};

    enhancer(template);

    expect(template.type).toBe(TestType);
  });
});
