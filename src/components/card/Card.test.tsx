import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import data from '../../data/data.json';
import type { Character } from '../../types/Character';
import Card from './Card';

describe('Card', () => {
  it('has style display flex', () => {
    const route = '/';

    const character = (data.characters as Character[])[0];

    render(
      <MemoryRouter initialEntries={[route]}>
        <Card key={character.name} {...character} />
      </MemoryRouter>
    );

    const element = screen.getByTestId('card');
    expect(element).toHaveStyle('display: flex');
  });
});
