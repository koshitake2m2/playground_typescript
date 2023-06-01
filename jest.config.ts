import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest/presets/default-esm",
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  transform: {
    "\\.[jt]s$": "babel-jest",
  },
};

export default config;
