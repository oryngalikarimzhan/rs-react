import React from 'react';
import { NavLink } from 'react-router-dom';

import { WithRouterProps, withRouter, routes } from '../../HOC/withRouter';
import styles from './header.module.scss';

class Header extends React.Component<WithRouterProps> {
  render() {
    const { location } = this.props;
    const route = location.pathname;
    const page = route in routes ? routes[route] : routes['*'];

    return (
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <h1>{page}</h1>
          <nav className={styles.nav}>
            <NavLink className={this.setActive} to="/">
              Home
            </NavLink>
            <NavLink className={this.setActive} to="/about">
              About Us
            </NavLink>
          </nav>
        </div>
      </header>
    );
  }

  private setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.linkActive}` : `${styles.link}`;
}

export default withRouter(Header);
