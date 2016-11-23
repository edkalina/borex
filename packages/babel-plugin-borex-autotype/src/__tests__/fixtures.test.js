/* eslint import/no-extraneous-dependencies: "off" */
/* eslint-env jest */
const babel = require('babel-core');
const path = require('path');
const glob = require('glob');


describe('Types should be generated correctly in', () => {
  const fixturePath = path.resolve(__dirname, 'fixtures');
  const fixtureFiles = glob.sync(path.join(fixturePath, '*.js'));

  fixtureFiles.forEach((fixtureFile) => {
    const fixtureName = path.basename(fixtureFile);

    it(`${fixtureName}`, () => {
      const transformed = babel.transformFileSync(fixtureFile).code;

      expect(transformed).toMatchSnapshot();
    });
  });

  it('string transformation', () => {
    const transformed = babel.transform(
      'const creator = actionCreator();',
      { extends: path.join(fixturePath, '.babelrc') }
    ).code;

    expect(transformed).toMatchSnapshot();
  });
});
