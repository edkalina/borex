/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import filter from '../filter';


const InitialState = ['value1', 'value2', 'value3'];
const InitialStateClone = InitialState.concat();
const TestAction = { type: 'test', payload: 'testPayload' };

describe('`filter`', () => {
  it('should return reducer', () => {
    const reducer = filter(() => false);

    expect(reducer).toBeInstanceOf(Function);
  });

  it('should not mutate array', () => {
    const reducer = filter(() => false);

    reducer(InitialState, TestAction);

    expect(InitialState).toEqual(InitialStateClone);
  });

  it('should call predicate with right arguments', () => {
    const predicate = jest.fn(() => true);
    const reducer = filter(predicate);
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
    const reducer = filter((value) => value === 'value1');
    const newState = reducer(InitialState, TestAction);

    expect(newState).toEqual(['value1']);
  });
});
