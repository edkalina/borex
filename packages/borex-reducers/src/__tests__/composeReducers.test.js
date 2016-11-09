/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import composeReducers from '../composeReducers';


const NoopReducer = state => state;

describe('`composeReducers`', () => {
  it('should return valid reducer', () => {
    const reducer = composeReducers(NoopReducer, NoopReducer);

    expect(reducer).toBeInstanceOf(Function);
  });

  it('should not create new reducer when single was passed', () => {
    const reducer = composeReducers(NoopReducer);

    expect(reducer).toBe(NoopReducer);
  });

  it('should throw when no reducers was passed', () => {
    expect(() => composeReducers()).toThrow();
  });

  it('should compose correctly', () => {
    const reducer1 = jest.fn(NoopReducer);
    const reducer2 = jest.fn(NoopReducer);
    const reducer3 = jest.fn(NoopReducer);
    const reducer = composeReducers(reducer1, reducer2, reducer3);

    reducer('currentState', { type: 'testAction' });

    expect(reducer1).toBeCalled();
    expect(reducer2).toBeCalled();
    expect(reducer3).toBeCalled();
  });
});
