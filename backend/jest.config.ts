import { pathsToModuleNameMapper } from 'ts-jest/utils';

const paths = {
  '@modules/*': ['modules/*'],
  '@config/*': ['config/*'],
  '@shared/*': ['shared/*'],
};

export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  moduleNameMapper: pathsToModuleNameMapper(paths, {
    prefix: '<rootDir>/src/',
  }),
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  coverageProvider: 'v8',
};
