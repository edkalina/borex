/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const babel = require('babel-core');
const fs = require('fs');
const glob = require('glob');
const minimatch = require('minimatch');
const path = require('path');
const spawnSync = require('child_process').spawnSync;

const packageDir = process.cwd();
const packageName = path.basename(packageDir);
const srcDir = path.resolve(packageDir, 'src');
const testsPattern = '**/__tests__/**';

function buildJs(file) {
  if (minimatch(file, testsPattern)) {
    return;
  }

  const relativeFilePath = path.relative(srcDir, file);
  const destFile = path.resolve(packageDir, relativeFilePath);
  const babelResult = babel.transformFileSync(file);

  spawnSync('mkdir', ['-p', path.dirname(destFile)]);
  fs.writeFileSync(destFile, babelResult.code);

  process.stdout.write(`${packageName}: ${relativeFilePath}\n`);
}

function buildPackage() {
  const jsFilesPattern = path.resolve(srcDir, '**/*.js');
  const jsFiles = glob.sync(jsFilesPattern, { nodir: true });

  jsFiles.forEach(file => buildJs(file));
}

buildPackage();
