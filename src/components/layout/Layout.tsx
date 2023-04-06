import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/layout/header/Header';
import { UsersContextProvider } from 'contexts/index';

function Layout() {
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
}

export default Layout;
