import { describe, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Home } from 'pages/index';
import { marvelLogo } from 'assets/index';
import { marvel } from 'data/index';

describe('Home', () => {
  it('should have an image', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    const img = screen.getByRole('img');

    expect(img).toBeVisible();
    expect(img.getAttribute('src')).toBe(marvelLogo);
  });

  it('should have several cards', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    const cards = screen.getByRole('cards');

    expect(cards).toBeVisible();
    expect(cards.childNodes.length).toBe(marvel.characters.length);
  });
});
