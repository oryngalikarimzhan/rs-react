import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Layout } from 'components/layout/index';

describe('Layout', () => {
  it('has header with style display flex', () => {
    const route = '/';

    render(
      <MemoryRouter initialEntries={[route]}>
        <Layout />
      </MemoryRouter>
    );

    const element = screen.getByRole('banner');

    expect(element).toBeVisible();
  });
});
