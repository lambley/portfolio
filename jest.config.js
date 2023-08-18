const config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        babel: true,
        tsConfig: "<rootDir>/tsconfig.jest.json",
      },
    ],
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        babel: true,
        tsConfig: "<rootDir>/tsconfig.jest.json",
      },
    ],
    "^.+\\.js?$": "babel-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
  },
};

module.exports = config;
