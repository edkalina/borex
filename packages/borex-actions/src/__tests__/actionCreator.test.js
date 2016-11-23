/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
// eslint-disable-next-line import/no-extraneous-dependencies
import { isFSA } from 'flux-standard-action';

import actionCreator from '../actionCreator';


function createTemplateEnhancer() {
  return jest.fn();
}

function createEnhancer() {
  const enhancerFn = jest.fn();
  const enhancer = jest.fn(() => enhancerFn);

  enhancer.fn = enhancerFn;

  return enhancer;
}

describe('`actionCreator`', () => {
  it('should create valid action creator', () => {
    const creator = actionCreator();

    expect(creator).toBeInstanceOf(Function);
  });

  it('should generate unique action type if not specified', () => {
    const firstCreator = actionCreator();
    const firstAction = firstCreator();
    const secondCreator = actionCreator();
    const secondAction = secondCreator();

    expect(firstAction.type).not.toEqual(secondAction.type);
  });

  it('should call enhancers on time', () => {
    const templateEnhancer = createTemplateEnhancer();
    const actionEnhancer = createEnhancer();

    const creator = actionCreator(templateEnhancer, actionEnhancer);

    expect(templateEnhancer).toHaveBeenCalledTimes(1);
    expect(actionEnhancer).toHaveBeenCalledTimes(1);
    expect(actionEnhancer.fn).toHaveBeenCalledTimes(0);

    creator();

    expect(templateEnhancer).toHaveBeenCalledTimes(1);
    expect(actionEnhancer).toHaveBeenCalledTimes(1);
    expect(actionEnhancer.fn).toHaveBeenCalledTimes(1);
  });

  it('should accept first string argument as action type', () => {
    const templateEnhancer = createTemplateEnhancer();
    const creator = actionCreator('testType', templateEnhancer);
    const action = creator();

    expect(action.type).toBe('testType');
    expect(templateEnhancer).toBeCalled();
  });

  it('should accept first `Symbol` argument as action type', () => {
    const templateEnhancer = createTemplateEnhancer();
    const typeSymbol = Symbol('typeSymbol');
    const creator = actionCreator(typeSymbol, templateEnhancer);
    const action = creator();

    expect(action.type).toBe(typeSymbol);
    expect(templateEnhancer).toBeCalled();
  });
});

describe('action creator created with `actionCreator`', () => {
  it('should have valid `type` property', () => {
    const creator = actionCreator();
    const action = creator();

    expect(creator.type).toEqual(action.type);
  });

  it('should have valid `displayName` property', () => {
    const creator = actionCreator();
    const action = creator();

    expect(creator.displayName).toEqual(action.type);
  });

  it('should have `toString` that returns action type', () => {
    const creator = actionCreator();
    const action = creator();

    expect(creator.toString()).toEqual(action.type);
  });
});

describe('generated action', () => {
  it('should be FSA-valid', () => {
    const creator = actionCreator();
    const action = creator();

    expect(isFSA(action)).toBe(true);
  });

  it('should have `error` set to `false` by default', () => {
    const creator = actionCreator();
    const action = creator();

    expect(action.error).toBe(false);
  });

  it('should have `error` set to `true` if payload is `Error`', () => {
    const creator = actionCreator();
    const action = creator(new Error('error'));

    expect(action.error).toBe(true);
  });

  it('should have valid `meta.creatorArgs`', () => {
    const creator = actionCreator();
    const action = creator('arg1', 'arg2');

    expect(action.meta.creatorArgs).toEqual(['arg1', 'arg2']);
  });

  it('should have `payload` to be first argument by default', () => {
    const creator = actionCreator();
    const action = creator('testPayload');

    expect(action.payload).toBe('testPayload');
  });
});
