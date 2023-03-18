import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Layout from './Layout';

// describe('Layout', () => {
//   it('uses flexbox in header', async () => {
//     render(<Layout />);
//     const element = screen.getByRole('banner');
//     expect(element.className).toEqual('header');
//     expect(getComputedStyle(element).display).toEqual('flex');
//   });

//   // it('Renders hello world', () => {
//   //   render(<Layout />);

//   //   expect(
//   //     screen.getByRole('heading', {
//   //       level: 1,
//   //     })
//   //   ).toHaveTextContent('Hello World');
//   // });
// });

describe('Layout', () => {
  it('headers style is display flex', () => {
    const route = '/';

    render(
      <MemoryRouter initialEntries={[route]}>
        <Layout />
      </MemoryRouter>
    );

    const element = screen.getByRole('banner');
    expect(element).toHaveStyle('display: flex');
  });
});
