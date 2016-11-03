/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import createReducer from '../createReducer';


describe('`createReducer`', () => {
  it('should return valid reducer', () => {
    const reducer = createReducer(() => {});

    expect(reducer).toBeInstanceOf(Function);
  });

  it('should call declare function', () => {
    const declareFn = jest.fn();
    createReducer(declareFn);

    expect(declareFn).toBeCalled();
    expect(declareFn.mock.calls[0][0]).toBeInstanceOf(Function);
  });
});

describe('reducer created with `createReducer`', () => {
  it('should call declared reducers correctly', () => {
    const subReducer1 = jest.fn(() => 'state1');
    const subReducer2 = jest.fn(() => 'state2');
    const action1 = { type: 'testType1' };
    const action2 = { type: 'testType2' };
    const declareFn = (on) => {
      on(action1.type, subReducer1);
      on(action2.type, subReducer2);
    };
    const reducer = createReducer(declareFn);

    reducer('currentState', action1);

    expect(subReducer1).toHaveBeenCalledTimes(1);
    expect(subReducer2).toHaveBeenCalledTimes(0);

    reducer('currentState', action2);

    expect(subReducer1).toHaveBeenCalledTimes(1);
    expect(subReducer2).toHaveBeenCalledTimes(1);
  });

  it('should call all declared reducers for one action', () => {
    const subReducer1 = jest.fn(() => 'state1');
    const subReducer2 = jest.fn(() => 'state2');
    const action = { type: 'testType' };
    const declareFn = (on) => {
      on(action.type, subReducer1);
      on(action.type, subReducer2);
    };
    const reducer = createReducer(declareFn);

    reducer('currentState', action);

    expect(subReducer1).toHaveBeenCalledTimes(1);
    expect(subReducer2).toHaveBeenCalledTimes(1);
  });

  it('should not change state if there is no suitable reducers', () => {
    const currentState = {};
    const action = { type: 'testType' };
    const reducer = createReducer(() => {});

    const newState = reducer(currentState, action);

    expect(newState).toBe(currentState);
  });
});
