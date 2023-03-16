import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.scss';

export default class NavBar extends React.Component {
  render(): React.ReactNode {
    return (
      <nav className={styles.nav}>
        <Link className={styles.link} to="/">
          Home
        </Link>
        <Link className={styles.link} to="/about">
          About Us
        </Link>
      </nav>
    );
  }
}
