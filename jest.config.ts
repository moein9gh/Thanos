const aliases = require("module-alias-jest/register");

export default {
  moduleNameMapper: aliases.jest,
  roots: ["<rootDir>/src", "<rootDir>/src/test"],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  }
};
