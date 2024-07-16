// These options are imported into the Jest config of each package, so
// `<rootDir>` refers to the respective /packages/* folder, e.g.
// /packages/antd, /packages/material, etc., not the root of the repo.

/** @type {import('@jest/types').Config.InitialOptions} */
export default {
  coveragePathIgnorePatterns: ['/utils/testing/', '/dist/', 'TestUtils.ts'],
  setupFilesAfterEnv: ['<rootDir>/../../jestSetup.ts'],
  testEnvironment: 'jsdom',
  // Keep these in sync with /tsconfig.json#compilerOptions#paths.
  moduleNameMapper: {
    'react-querybuilder': ['<rootDir>/../../packages/react-querybuilder/src'],
    '@rqb-testing': ['<rootDir>/../../utils/testing'],
  },
};
