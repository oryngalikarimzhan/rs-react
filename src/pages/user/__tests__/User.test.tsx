import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it } from 'vitest';

import { User } from 'pages';

describe('User form page', () => {
  it('should have heading', () => {
    const route = '/userform';

    render(
      <MemoryRouter initialEntries={[route]}>
        <User />
      </MemoryRouter>
    );

    const headingValue = 'User Form';
    const heading = screen.getByRole('heading', { level: 3 });

    expect(heading).toBeVisible();
    expect(heading).toHaveTextContent(headingValue);
  });
});

describe('Form', () => {
  it('should be rendered form element', () => {
    const route = '/userform';

    render(
      <MemoryRouter initialEntries={[route]}>
        <User />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    const checkbox = screen.getByRole('checkbox-personal-data');
    const radioFemale = screen.getByRole('radio-female');
    const radioMale = screen.getByRole('radio-male');
    const firstnameInput = screen.getByRole('text-firstname');
    const lastnameInput = screen.getByRole('text-lastname');
    const birthdayInput = screen.getByRole('date-birthday');
    const countrySelect = screen.getByRole('select-country');
    const form = screen.getByRole('reusable-form');

    expect(form).toBeVisible();
    expect(checkbox).toBeInTheDocument();
    expect(radioMale).toBeInTheDocument();
    expect(radioFemale).toBeInTheDocument();
    expect(radioFemale).not.toBeVisible();
    expect(radioFemale).not.toBeVisible();
    expect(firstnameInput).toBeVisible();
    expect(lastnameInput).toBeVisible();
    expect(birthdayInput).toBeVisible();
    expect(countrySelect).toBeVisible();
    expect(button).toBeVisible();
    expect(form).toContainElement(checkbox);
    expect(form).toContainElement(button);
    expect(button).toHaveTextContent('Submit');
  });
});
