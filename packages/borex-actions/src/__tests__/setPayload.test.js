/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import { EnhancerType, ActionEnhancer } from 'borex-action-enhancer-helpers/symbols';
import setPayload from '../setPayload';


describe('`setPayload`', () => {
  it('should return ActionEnhancer', () => {
    const enhancer = setPayload(() => {});

    expect(enhancer).toBeInstanceOf(Function);
    expect(enhancer[EnhancerType]).toBe(ActionEnhancer);
  });

  it('should set `payload` with result of function', () => {
    const payloadGetter = jest.fn(() => 'PayloadFromEnhancer');
    const enhancer = setPayload(payloadGetter);
    const action = { type: 'TestType', payload: 'payload' };

    enhancer(action);

    expect(action.payload).toBe('PayloadFromEnhancer');
  });

  it('should call getter with arguments', () => {
    const payloadGetter = jest.fn();
    const enhancer = setPayload(payloadGetter);
    const action = { type: 'TestType', payload: 'payload' };

    enhancer(action, 'arg1', 'arg2');

    expect(payloadGetter).toBeCalledWith('arg1', 'arg2');
  });
});
