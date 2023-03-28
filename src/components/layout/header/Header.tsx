import React from 'react';

import styles from './Header.module.scss';
import { WithRouterProps, withRouter, routes } from 'hoc/index';
import { NavBar } from 'components/shared/index';

class Header extends React.Component<WithRouterProps> {
  render() {
    const { location } = this.props;
    const route = location.pathname;
    const page = (route in routes ? routes[route] : routes['*']).toUpperCase();

    return (
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <h1>{page}</h1>
          <NavBar />
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
