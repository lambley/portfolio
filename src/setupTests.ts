import type {Config} from 'jest';
import {defaults} from 'jest-config';
import "@testing-library/jest-dom";

const config: Config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
};

export default config;
