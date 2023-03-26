import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../../components/header/Header';
import UserContextProvider from '../UserContextProvider';

export default class Layout extends React.Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <UserContextProvider>
            <Outlet />
          </UserContextProvider>
        </main>
      </>
    );
  }
}
