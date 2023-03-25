import { describe, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Home from './Home';
import marvel from '../../assets/Marvel_Logo.svg';
import data from '../../data/marvel.json';

describe('Home', () => {
  it('should have an image', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    const img = screen.getByRole('img');

    expect(img).toBeVisible();
    expect(img.getAttribute('src')).toBe(marvel);
  });

  it('should have several cards', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    const cards = screen.getByRole('cards');

    expect(cards).toBeVisible();
    expect(cards.childNodes.length).toBe(data.characters.length);
  });
});
