import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { nav, link, linkActive } from './Navbar.module.scss';

export const NavBar: FC = () => {
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
