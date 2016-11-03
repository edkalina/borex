/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import set from '../set';


const InitialState = 'InitialState';
const TestAction = { type: 'test', payload: 'testPayload' };
const GetterValue = 'GetterValue';

describe('`set`', () => {
  it('should return reducer', () => {
    const reducer = set();

    expect(reducer).toBeInstanceOf(Function);
  });

  it('should return `payload` as new state', () => {
    const reducer = set();
    const newState = reducer(InitialState, TestAction);

    expect(newState).toEqual(TestAction.payload);
  });

  it('should use getter for new state', () => {
    const reducer = set(() => GetterValue);
    const newState = reducer(InitialState, TestAction);

    expect(newState).toEqual(GetterValue);
  });
});
