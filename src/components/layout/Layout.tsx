import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './header/Header';
import { UsersContextProvider } from 'contexts';

export const Layout: FC = () => {
  return (
    <>
      <Header />

      <main>
        <UsersContextProvider>
          <Outlet />
        </UsersContextProvider>
      </main>
    </>
  );
};
