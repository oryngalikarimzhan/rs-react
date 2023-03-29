import React from 'react';
import CSS from 'csstype';

import { header } from './Header.module.scss';
import { WithRouterProps, withRouter, routes } from 'hocs/index';
import { NavBar } from 'components/shared/index';
import { Wrapper } from 'components/ui/index';

function Header(props: WithRouterProps) {
  const { location } = props;
  const route = location.pathname;
  const page = (route in routes ? routes[route] : routes['*']).toUpperCase();
  const wrapperStyle: CSS.Properties = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <header className={header}>
      <Wrapper style={wrapperStyle}>
        <h1>{page}</h1>
        <NavBar />
      </Wrapper>
    </header>
  );
}

export default withRouter(Header);
