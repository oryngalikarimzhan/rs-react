import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import SearchBar from '../searchbar/SearchBar';
import styles from './layout.module.scss';

export default class Layout extends React.Component {
  private setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.linkActive}` : `${styles.link}`;

  render() {
    return (
      <>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <NavLink className={this.setActive} to="/">
              Home
            </NavLink>
            <NavLink className={this.setActive} to="/about">
              About Us
            </NavLink>
          </nav>
          <SearchBar />
        </header>
        <main className={styles.main}>
          <Outlet />
        </main>
      </>
    );
  }
}
