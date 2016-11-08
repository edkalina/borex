/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import sideEffectProcessor from '../sideEffectProcessor';

function createStore() {
  return {
    dispatch: jest.fn(),
    getState: jest.fn(),
  };
}

function createActionWithSideEffects() {
  return {
    type: 'sideEffect',
    meta: {
      sideEffects: [
        jest.fn(),
        jest.fn(),
      ],
      creatorArgs: ['arg1', 'arg2'],
    },
  };
}

function createMiddlewareHandler(...args) {
  const store = createStore();
  const next = jest.fn();
  const middleware = sideEffectProcessor(...args);
  const handler = middleware(store)(next);

  return { store, next, handler };
}

describe('`sideEffectProcessor`', () => {
  it('should call side effects of action', () => {
    const { handler } = createMiddlewareHandler();
    const action = createActionWithSideEffects();

    handler(action);

    action.meta.sideEffects.forEach((sideEffect) => {
      expect(sideEffect).toBeCalled();
    });
  });

  it('should call `next` callback', () => {
    const { handler, next } = createMiddlewareHandler();
    const action = createActionWithSideEffects();

    handler(action);

    expect(next).toBeCalled();
  });

  it('should skip `next` call when `meta.sideEffectsOnly` is true', () => {
    const { handler, next } = createMiddlewareHandler();
    const action = createActionWithSideEffects();
    action.meta.sideEffectsOnly = true;

    handler(action);

    expect(next).not.toBeCalled();
  });

  it('should not fail on actions without `meta`', () => {
    const { handler } = createMiddlewareHandler();

    handler({ type: 'test' });
  });

  it('should not fail on actions without `meta.creatorArgs`', () => {
    const { handler } = createMiddlewareHandler();
    const action = createActionWithSideEffects();

    delete action.meta.creatorArgs;
    handler(action);
  });

  it('should pass `getState` and `dispatch` in context', () => {
    const { handler, store } = createMiddlewareHandler();
    const action = createActionWithSideEffects();
    const expectedContext = { dispatch: store.dispatch, getState: store.getState };

    handler(action);

    const passedContext = action.meta.sideEffects[0].mock.calls[0][0];

    expect(passedContext).toEqual(expectedContext);
  });

  it('should pass `context` into sideEffect', () => {
    const definedContext = { first: 1, second: 2 };
    const { handler } = createMiddlewareHandler({ context: definedContext });
    const action = createActionWithSideEffects();

    handler(action);

    const passedContext = action.meta.sideEffects[0].mock.calls[0][0];

    expect(passedContext.first).toBe(1);
    expect(passedContext.second).toBe(2);
  });

  it('should pass creator arguments into side effect function', () => {
    const { handler } = createMiddlewareHandler();
    const action = createActionWithSideEffects();

    handler(action);

    const argsOfFirstSideEffectCall = action.meta.sideEffects[0].mock.calls[0].slice(1);

    expect(argsOfFirstSideEffectCall).toEqual(['arg1', 'arg2']);
  });
});
