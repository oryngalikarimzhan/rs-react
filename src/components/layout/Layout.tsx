import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../../components/header/Header';
import styles from './layout.module.scss';

export default class Layout extends React.Component {
  render() {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
      </>
    );
  }
}
