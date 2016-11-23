/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import withSideEffect from '../withSideEffect';


describe('`withSideEffect`', () => {
  it('should return ActionTemplateEnhancer', () => {
    const enhancer = withSideEffect(() => {});
    expect(enhancer).toBeInstanceOf(Function);
  });

  it('should add all side effects into `meta.sideEffects`', () => {
    const actionTemplate = { type: 'TestType', meta: {} };
    const sideEffect1 = jest.fn();
    const enhancer1 = withSideEffect(sideEffect1);
    const sideEffect2 = jest.fn();
    const enhancer2 = withSideEffect(sideEffect2);
    const sideEffect3 = jest.fn();
    const enhancer3 = withSideEffect(sideEffect3);

    enhancer1(actionTemplate);
    enhancer2(actionTemplate);
    enhancer3(actionTemplate);

    expect(actionTemplate.meta.sideEffects).toEqual([sideEffect1, sideEffect2, sideEffect3]);
  });
});
