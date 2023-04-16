import React from 'react';
import { describe } from 'vitest';
import { render as renderComponent, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import { SearchBar } from 'components/shared';
import { store } from 'store';

const render = (Component: React.ReactNode, route: string) =>
  renderComponent(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{Component}</MemoryRouter>
    </Provider>
  );

const searchBarProps = {
  isAvailable: true,
  onSearch: () => {},
  isLoading: false,
  errorMessage: false,
} satisfies {
  isAvailable: boolean;
  onSearch: () => void;
  isLoading: boolean;
  errorMessage: string | false;
};

describe('SearchBar', () => {
  it('should be rendered form element with search input', () => {
    const route = '/';

    render(<SearchBar {...searchBarProps} />, route);

    const button = screen.getByRole('button');
    const searchBox = screen.getByRole('search-input');
    const form = screen.getByRole('search-form');

    expect(form).toBeVisible();
    expect(searchBox).toBeVisible();
    expect(button).toBeVisible();
    expect(form).toContainElement(searchBox);
    expect(form).toContainElement(button);
    expect(button).toHaveTextContent('Search');
    expect(searchBox.getAttribute('placeholder')).toBe('...');
  });

  it('histories block should appear when focus on searchbox', async () => {
    const route = '/';
    const user = userEvent.setup();

    render(<SearchBar {...searchBarProps} />, route);

    const value = 'Some value';

    const searchBox = screen.getByRole('search-input');
    const button = screen.getByRole('button');

    await act(async () => {
      await user.type(searchBox, value);
      await user.click(button);
      searchBox.focus();
    });

    expect(screen.getByRole('histories')).toBeVisible();
  });
});
