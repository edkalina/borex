/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import { EnhancerType, ActionEnhancer } from 'borex-action-enhancer-helpers/symbols';
import setMeta from '../setMeta';


const TestField = 'testField';
const TestValue = 'testValue';
const TestValueGetter = () => TestValue;

describe('`setMeta`', () => {
  it('should return ActionEnhancer', () => {
    const enhancer = setMeta(TestField, TestValueGetter);

    expect(enhancer).toBeInstanceOf(Function);
    expect(enhancer[EnhancerType]).toBe(ActionEnhancer);
  });

  it('should set specified field in `meta`', () => {
    const enhancer = setMeta(TestField, TestValueGetter);
    const action = { meta: {} };

    enhancer(action);

    expect(action.meta[TestField]).toBe(TestValue);
  });

  it('should call getter with arguments', () => {
    const valueGetter = jest.fn(TestValueGetter);
    const enhancer = setMeta(TestField, valueGetter);
    const action = { meta: {} };

    enhancer(action, 'arg1', 'arg2');

    expect(valueGetter).toBeCalledWith('arg1', 'arg2');
  });
});
