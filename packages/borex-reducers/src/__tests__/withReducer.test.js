/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import withReducer from '../withReducer';


describe('`withReducer`', () => {
  it('should return ActionTemplateEnhancer', () => {
    const enhancer = withReducer(() => {});
    expect(enhancer).toBeInstanceOf(Function);
  });

  it('should compose all reducers', () => {
    const actionTemplate = { type: 'TestType', meta: {} };
    const reducer1 = jest.fn(() => 'state1');
    const enhancer1 = withReducer(reducer1);
    const reducer2 = jest.fn(() => 'state2');
    const enhancer2 = withReducer(reducer2);
    const reducer3 = jest.fn(() => 'state3');
    const enhancer3 = withReducer(reducer3);

    enhancer1(actionTemplate);
    enhancer2(actionTemplate);
    enhancer3(actionTemplate);

    expect(actionTemplate.meta.reducer).toBeInstanceOf(Function);

    const newState = actionTemplate.meta.reducer('currentState', actionTemplate);

    expect(reducer1).toBeCalledWith('currentState', actionTemplate);
    expect(reducer2).toBeCalledWith('state1', actionTemplate);
    expect(reducer3).toBeCalledWith('state2', actionTemplate);
    expect(newState).toBe('state3');
  });
});
