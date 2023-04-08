import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import React from 'react';

import { About } from 'pages';

describe('About', () => {
  it('should have text photo element', () => {
    const route = '/about';

    render(
      <MemoryRouter initialEntries={[route]}>
        <About />
      </MemoryRouter>
    );

    const loremTextElement = screen.getByTestId('lorem');

    expect(loremTextElement).toBeVisible();
  });
});
