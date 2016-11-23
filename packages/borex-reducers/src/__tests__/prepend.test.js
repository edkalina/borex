/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import prepend from '../prepend';


const InitialState = ['value1', 'value2'];
const InitialStateClone = InitialState.concat();
const TestAction = { type: 'test', payload: 'testPayload' };
const GetterValue = 'GetterValue';

describe('`prepend`', () => {
  it('should return reducer', () => {
    const reducer = prepend();

    expect(reducer).toBeInstanceOf(Function);
  });

  it('should not mutate array', () => {
    const reducer = prepend();

    reducer(InitialState, TestAction);

    expect(InitialState).toEqual(InitialStateClone);
  });

  it('should prepend `payload` to array', () => {
    const reducer = prepend();
    const newState = reducer(InitialState, TestAction);

    expect(newState).toEqual([TestAction.payload, ...InitialState]);
  });

  it('should use getter for prepended value', () => {
    const reducer = prepend(() => GetterValue);
    const newState = reducer(InitialState, TestAction);

    expect(newState).toEqual([GetterValue, ...InitialState]);
  });
});
