import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/layout/header/Header';
import { UsersContextProvider } from 'contexts/index';

export default class Layout extends React.Component {
  render() {
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
}
