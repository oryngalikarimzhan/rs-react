import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import { fetch } from 'cross-fetch';

expect.extend(matchers);

global.fetch = fetch;
