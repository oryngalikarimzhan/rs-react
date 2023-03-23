import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './navbar.module.scss';

class NavBar extends React.Component {
  render() {
    return (
      <nav className={styles.nav}>
        <NavLink className={this.setActive} to="/">
          Home
        </NavLink>
        <NavLink className={this.setActive} to="/about">
          About Us
        </NavLink>
        <NavLink className={this.setActive} to="/form">
          Form
        </NavLink>
      </nav>
    );
  }

  private setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.linkActive}` : `${styles.link}`;
}

export default NavBar;
