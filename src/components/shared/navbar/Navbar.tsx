import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.scss';

const { nav, link, linkActive } = styles;
export const NavBar: React.FC = () => {
  const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${link} ${linkActive}` : `${link}`;

  return (
    <nav className={nav}>
      <NavLink className={setActive} to="/">
        Home
      </NavLink>

      <NavLink className={setActive} to="/about">
        About Us
      </NavLink>

      <NavLink className={setActive} to="/userform">
        Form
      </NavLink>
    </nav>
  );
};
