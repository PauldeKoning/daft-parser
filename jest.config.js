/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  "rootDir": "./",
  "preset": "ts-jest",
  "testEnvironment": "node",
  "transformIgnorePatterns": ['node_modules'],
  "collectCoverageFrom": [
    "src/**/*.ts*"
  ]
};