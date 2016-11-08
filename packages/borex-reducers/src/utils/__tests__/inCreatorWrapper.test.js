/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import inCreatorWrapper from '../inCreatorWrapper';


const TestPath = 'path';
const TestReducerCreator = () => state => state;

describe('`inCreatorWrapper`', () => {
  it('should work correctly', () => {
    const subReducerCreator = inCreatorWrapper(TestReducerCreator);
    const subReducer = subReducerCreator(TestPath);

    expect(subReducerCreator).toBeInstanceOf(Function);
    expect(subReducer).toBeInstanceOf(Function);
  });

  it('should pass arguments to original creator', () => {
    const mockedCreator = jest.fn(TestReducerCreator);
    const subReducerCreator = inCreatorWrapper(mockedCreator);

    subReducerCreator(TestPath, 'arg1', 'arg2');

    expect(mockedCreator).toBeCalledWith('arg1', 'arg2');
  });
});
