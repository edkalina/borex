/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import createMetaReducer from '../createMetaReducer';


function createTestAction(withReducer = false) {
  return {
    type: 'testType',
    payload: 'testPayload',
    meta: {
      reducer: withReducer ? jest.fn(() => 'stateFromMeta') : null,
    },
  };
}

describe('`createMetaReducer`', () => {
  it('should return valid reducer', () => {
    const reducer = createMetaReducer();

    expect(reducer).toBeInstanceOf(Function);
  });
});

describe('reducer created with `createMetaReducer`', () => {
  it('should call `acion.meta.reducer`', () => {
    const reducer = createMetaReducer();
    const actionWithReducer = createTestAction(true);
    const newState = reducer('currentState', actionWithReducer);
    const expectedArgs = ['currentState', actionWithReducer.payload, actionWithReducer];

    expect(actionWithReducer.meta.reducer).toBeCalledWith(...expectedArgs);
    expect(newState).toBe('stateFromMeta');
  });

  it('should call reducer from argument', () => {
    const argReducer = jest.fn(() => 'stateFromArg');
    const reducer = createMetaReducer(argReducer);
    const action = createTestAction(false);
    const expectedArgs = ['currentState', action.payload, action];

    const newState = reducer('currentState', action);

    expect(argReducer).toBeCalledWith(...expectedArgs);
    expect(newState).toBe('stateFromArg');
  });

  it('should not change state if no reducer is available', () => {
    const reducer = createMetaReducer();
    const action = createTestAction(false);
    const currentState = {};
    const newState = reducer(currentState, action);

    expect(newState).toBe(currentState);
  });

  it('should call both meta-reducer and arg-reducer', () => {
    const argReducer = jest.fn(() => 'stateFromArg');
    const reducer = createMetaReducer(argReducer);
    const actionWithReducer = createTestAction(true);

    const newState = reducer('currentState', actionWithReducer);

    expect(actionWithReducer.meta.reducer).toBeCalled();
    expect(actionWithReducer.meta.reducer.mock.calls[0][0]).toBe('currentState');

    expect(argReducer).toBeCalled();
    expect(argReducer.mock.calls[0][0]).toBe('stateFromMeta');

    expect(newState).toBe('stateFromArg');
  });
});
