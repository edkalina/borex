/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import inReducerWrapper from '../scopeReducer';


const TestPath = 'level1.level2';
const InitialState = { level1: { level2: { level3: 'someValue' } } };
const ExpectedState = { level1: { level2: { level3a: 'anotherValue' } } };

const TestAction = { type: 'test', payload: { ...ExpectedState.level1.level2 } };
const TestReducer = (state, action) => action.payload;
const NoopReducer = state => state;

describe('`inReducerWrapper`', () => {
  it('should work correctly', () => {
    const subReducer = inReducerWrapper(TestPath, TestReducer);
    const newState = subReducer(InitialState, TestAction);

    expect(newState).toEqual(ExpectedState);
  });

  it('should not mutate object', () => {
    const subReducer = inReducerWrapper(TestPath, TestReducer);
    const newState = subReducer(InitialState, TestAction);

    expect(newState).not.toBe(ExpectedState);
    expect(newState.level1).not.toBe(ExpectedState.level1);
    expect(newState.level1.level2).not.toBe(ExpectedState.level1.level2);
  });

  it('should not create new object when state was not changed', () => {
    const subReducer = inReducerWrapper(TestPath, NoopReducer);
    const newState = subReducer(InitialState, TestAction);

    expect(newState).toBe(InitialState);
  });

  it('should set displayName of wrapper function', () => {
    function testFunction() {}
    const subReducer = inReducerWrapper(TestPath, testFunction);

    expect(subReducer.displayName).toBe('testFunctionIn');
  });
});
