import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import data from '../../data/marvel.json';
import Character from '../../dto/Character';
import { CharacterCard } from './Card';

describe('Card', () => {
  it('has style display flex', () => {
    const route = '/';

    const character = (data.characters as Character[])[0];

    render(
      <MemoryRouter initialEntries={[route]}>
        <CharacterCard key={character.name} data={character} />
      </MemoryRouter>
    );

    const element = screen.getByTestId('card');

    expect(element).toBeVisible();
    expect(element).toHaveStyle('display: flex');
  });
});
