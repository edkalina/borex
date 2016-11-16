/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const fs = require('fs');
const glob = require('glob');
const minimatch = require('minimatch');
const path = require('path');

const packageDir = process.cwd();
const packageName = path.basename(packageDir);

const jsPattern = '**/*.js';
const jsFilesPattern = path.resolve(packageDir, jsPattern);
const srcFilesPattern = path.resolve(packageDir, 'src', jsPattern);
const depFilesPattern = path.resolve(packageDir, 'node_modules', jsPattern);
const jsFiles = glob.sync(jsFilesPattern, { nodir: true });

if (packageName === 'babel-plugin-borex-autotype') {
  process.exit();
}

jsFiles.forEach((file) => {
  if (minimatch(file, srcFilesPattern) || minimatch(file, depFilesPattern)) {
    return;
  }

  const relativeFilePath = path.relative(packageDir, file);

  fs.unlinkSync(file);
  process.stdout.write(`${packageName}: ${relativeFilePath}\n`);
});
