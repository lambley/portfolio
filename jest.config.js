module.exports = {
  verbose: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        babel: true,
        tsConfig: "<rootDir>/tsconfig.json",
      },
    ],
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        babel: true,
        tsConfig: "<rootDir>/tsconfig.json",
      },
    ],
    "^.+\\.js?$": "babel-jest",
    "^.+\\.jsx?$": "babel-jest",
    "^.+.tsx?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^react-markdown$": "<rootDir>/__tests__/utils/mocks/mockReactMarkdown.tsx",
  },
  testPathIgnorePatterns: [
    "<rootDir>/e2e/",
    "<rootDir>/__tests__/utils/mocks/",
    ".*\\.mock\\.(js|jsx|ts|tsx)$",
  ],
};
