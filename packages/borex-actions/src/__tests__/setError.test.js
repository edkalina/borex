/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
import setError from '../setError';

test('`setError` should set `error` field to true', () => {
  const template = {};

  setError(template);

  expect(template.error).toBe(true);
});
