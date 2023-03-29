import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { marvel } from 'data/index';
import { Character } from 'models/index';
import { CharacterCard } from 'components/shared/index';

describe('Card', () => {
  it('has style display flex', () => {
    const route = '/';

    const character = (marvel.characters as Character[])[0];

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
