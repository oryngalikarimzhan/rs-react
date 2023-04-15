import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './header/Header';

export const Layout: FC = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
};
