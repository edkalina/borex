/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import update from '../update';


const InitialState = { key1: 'value1', key2: 'value2' };
const InitialStateClone = { ...InitialState };
const TestAction = { type: 'test', payload: { key1: 'value1a', key3: 'value3' } };
const GetterValue = { key2: 'value2a', key4: 'value4' };

describe('`update`', () => {
  it('should return reducer', () => {
    const reducer = update();

    expect(reducer).toBeInstanceOf(Function);
  });

  it('should not mutate object', () => {
    const reducer = update();

    reducer(InitialState, TestAction);

    expect(InitialState).toEqual(InitialStateClone);
  });

  it('should update object with `payload` items', () => {
    const reducer = update();
    const newState = reducer(InitialState, TestAction);

    expect(newState).toEqual({ ...InitialState, ...TestAction.payload });
  });

  it('should update object with getter result\'s items', () => {
    const reducer = update(() => GetterValue);
    const newState = reducer(InitialState, TestAction);

    expect(newState).toEqual({ ...InitialState, ...GetterValue });
  });
});
