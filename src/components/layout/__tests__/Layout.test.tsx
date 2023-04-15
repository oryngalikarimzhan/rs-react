import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Layout } from 'components/layout';
import { routes } from 'utils/constants';

describe('Layout', () => {
  it('has header', () => {
    const route = '/';

    render(
      <MemoryRouter initialEntries={[route]}>
        <Layout />
      </MemoryRouter>
    );

    const element = screen.getByRole('banner');

    expect(element).toBeVisible();
  });

  it('has h1 heading', () => {
    const route = '/';

    render(
      <MemoryRouter initialEntries={[route]}>
        <Layout />
      </MemoryRouter>
    );

    const element = screen.getByRole('heading', { level: 1 });

    expect(element).toBeVisible();
    expect(element).toHaveTextContent(routes['/'].toUpperCase());
  });
});
