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
        tsConfig: "tsconfig.jest.json",
      },
    ],
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        babel: true,
        tsConfig: "tsconfig.jest.json",
      },
    ],
    "^.+\\.js?$": "babel-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
};

module.exports = config;
