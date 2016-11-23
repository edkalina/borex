/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import commandCreator from '../commandCreator';

test('`setError` should set `error` field to true', () => {
  const commandFn = jest.fn();
  const creator = commandCreator(commandFn);
  const action = creator();

  expect(action.meta.sideEffects).toEqual([commandFn]);
  expect(action.meta.sideEffectsOnly).toEqual(true);
});
