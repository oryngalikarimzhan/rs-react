import React from 'react';
import { NavLink } from 'react-router-dom';

import { nav, link, linkActive } from './Navbar.module.scss';

class NavBar extends React.Component {
  render() {
    return (
      <nav className={nav}>
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

  private setActive = ({ isActive }: { isActive: boolean }) => {
    return isActive ? `${link} ${linkActive}` : `${link}`;
  };
}

export default NavBar;
