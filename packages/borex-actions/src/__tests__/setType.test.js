/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import setType from '../setType';


const TestType = 'testType';

describe('`setType`', () => {
  it('should return ActionTemplateEnhancer', () => {
    const enhancer = setType(TestType);
    expect(enhancer).toBeInstanceOf(Function);
  });

  it('should set `type`', () => {
    const enhancer = setType(TestType);
    const template = {};

    enhancer(template);

    expect(template.type).toBe(TestType);
  });
});
