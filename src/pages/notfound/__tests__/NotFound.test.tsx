import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import React from 'react';

import { NotFound } from 'pages/index';

describe('NotFound', () => {
  it('should have heading', () => {
    const route = '/this-is-not-existing-route';

    render(
      <MemoryRouter initialEntries={[route]}>
        <NotFound />
      </MemoryRouter>
    );

    const headingValue = 'Страница не найдена';
    const heading = screen.getByRole('heading', { level: 2 });

    expect(heading).toBeVisible();
    expect(heading).toHaveTextContent(headingValue);
  });
});
