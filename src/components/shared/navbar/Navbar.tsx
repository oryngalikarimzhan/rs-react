import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import { nav, link, linkActive } from './Navbar.module.scss';

function NavBar() {
  const setActive = useCallback(
    ({ isActive }: { isActive: boolean }) => (isActive ? `${link} ${linkActive}` : `${link}`),
    []
  );

  return (
    <nav className={nav}>
      <NavLink className={setActive} to="/">
        Home
      </NavLink>

      <NavLink className={setActive} to="/about">
        About Us
      </NavLink>

      <NavLink className={setActive} to="/form">
        Form
      </NavLink>
    </nav>
  );
}

export default NavBar;
