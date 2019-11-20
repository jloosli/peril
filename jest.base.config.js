const {pathsToModuleNameMapper} = require('ts-jest/utils');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const {compilerOptions} = require('./tsconfig');

const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths || {}, {prefix: '<rootDir>/'});

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [
    '<rootDir>/setupJest.ts'
  ],
  moduleNameMapper
};
