/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import append from '../append';


const InitialState = ['value1', 'value2'];
const InitialStateClone = InitialState.concat();
const TestAction = { type: 'test', payload: 'testPayload' };
const GetterValue = 'GetterValue';

describe('`append`', () => {
  it('should return reducer', () => {
    const reducer = append();

    expect(reducer).toBeInstanceOf(Function);
  });

  it('should not mutate array', () => {
    const reducer = append();

    reducer(InitialState, TestAction);

    expect(InitialState).toEqual(InitialStateClone);
  });

  it('should append `payload` to array', () => {
    const reducer = append();
    const newState = reducer(InitialState, TestAction);

    expect(newState).toEqual([...InitialState, TestAction.payload]);
  });

  it('should use getter for appended value', () => {
    const reducer = append(() => GetterValue);
    const newState = reducer(InitialState, TestAction);

    expect(newState).toEqual([...InitialState, GetterValue]);
  });
});
