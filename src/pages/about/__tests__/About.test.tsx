import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import React from 'react';

import { About } from 'pages/index';

describe('About', () => {
  it('should have heading', () => {
    const route = '/about';

    render(
      <MemoryRouter initialEntries={[route]}>
        <About />
      </MemoryRouter>
    );

    const headingValue = 'Страница о нас';
    const heading = screen.getByRole('heading', { level: 2 });

    expect(heading).toBeVisible();
    expect(heading).toHaveTextContent(headingValue);
  });
});
