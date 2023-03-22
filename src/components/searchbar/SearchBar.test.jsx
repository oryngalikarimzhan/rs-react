import React from 'react';
import { describe } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import SearchBar from './SearchBar';

describe('SearchBar', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should be rendered form element with search input', () => {
    const route = '/';

    render(
      <MemoryRouter initialEntries={[route]}>
        <SearchBar />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    const searchBox = screen.getByRole('searchbox');
    const form = screen.getByRole('searchform');

    expect(form).toBeVisible();
    expect(searchBox).toBeVisible();
    expect(button).toBeVisible();
    expect(form).toContainElement(searchBox);
    expect(form).toContainElement(button);
    expect(button).toHaveTextContent('Search');
    expect(searchBox.getAttribute('placeholder')).toBe('...');
  });

  it('search input should be cleared when click X button', async () => {
    const route = '/';
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={[route]}>
        <SearchBar />
      </MemoryRouter>
    );

    const value = 'Some value';
    const searchBox = screen.getByRole('searchbox');

    await act(async () => {
      await user.type(searchBox, value);
      await user.click(searchBox);
    });

    expect(searchBox).toBeVisible();
    expect(searchBox.value).not.toEqual(value);
    expect(searchBox.value).toEqual('');
  });

  it('histories block should appear when focus on searchbox', async () => {
    const route = '/';
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={[route]}>
        <SearchBar />
      </MemoryRouter>
    );

    const value = 'Some value';
    const searchBox = screen.getByRole('searchbox');
    const button = screen.getByRole('button');

    await act(async () => {
      await user.type(searchBox, value);
      await user.click(button);
      searchBox.focus();
    });

    expect(screen.getByRole('histories')).toBeVisible();
  });
});
