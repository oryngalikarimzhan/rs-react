import React from 'react';
import { describe, it } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { marvel } from 'data';
import { Character } from 'models';
import { Post } from 'components/shared';

describe('Post', () => {
  it('has style display flex', () => {
    const route = '/';

    const character = (marvel.characters as Character[])[0];

    render(
      <MemoryRouter initialEntries={[route]}>
        <Post index={0} data={character} />
      </MemoryRouter>
    );

    const element = screen.getByTestId('post');
    expect(element).toBeVisible();
    expect(element).toHaveStyle('display: flex');
  });

  it('', async () => {
    const route = '/';
    const user = userEvent.setup();

    const character = (marvel.characters as Character[])[0];

    render(
      <MemoryRouter initialEntries={[route]}>
        <Post index={0} data={character} />
      </MemoryRouter>
    );

    const element = screen.getByTestId('post');

    await act(async () => {
      await user.click(element);
    });

    const modal = screen.getByRole('modal');
    const postModal = screen.getByTestId('postmodal');

    expect(modal).toBeVisible();
    expect(postModal).toBeVisible();
  });
});
