/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import reject from '../reject';


const InitialState = ['value1', 'value2', 'value3'];
const InitialStateClone = InitialState.concat();
const TestAction = { type: 'test', payload: 'testPayload' };

describe('`filter`', () => {
  it('should return reducer', () => {
    const reducer = reject(() => true);

    expect(reducer).toBeInstanceOf(Function);
  });

  it('should not mutate array', () => {
    const reducer = reject(() => true);

    reducer(InitialState, TestAction);

    expect(InitialState).toEqual(InitialStateClone);
  });

  it('should call predicate with right arguments', () => {
    const predicate = jest.fn(() => false);
    const reducer = reject(predicate);
    const expectedArgs = [
      InitialState[InitialState.length - 1],
      TestAction.payload,
      InitialState.length - 1,
      InitialState,
      TestAction,
    ];

    reducer(InitialState, TestAction);

    expect(predicate).toHaveBeenLastCalledWith(...expectedArgs);
  });

  it('should filter array', () => {
    const reducer = reject((value) => value !== 'value1');
    const newState = reducer(InitialState, TestAction);

    expect(newState).toEqual(['value1']);
  });
});
