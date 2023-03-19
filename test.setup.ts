import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { expect, afterEach } from 'vitest';
import { fetch } from 'cross-fetch';

expect.extend(matchers);

global.fetch = fetch;

afterEach(() => cleanup());
