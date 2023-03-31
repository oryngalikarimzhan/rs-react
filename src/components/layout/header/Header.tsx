import React from 'react';
import CSS from 'csstype';

import { header } from './Header.module.scss';
import { WithRouterProps, withRouter } from 'hocs/index';
import { routes } from 'utils/index';
import { NavBar } from 'components/shared/index';
import { Wrapper } from 'components/ui/index';

const wrapperStyle: CSS.Properties = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

function Header(props: WithRouterProps) {
  const { location } = props;
  const route = location.pathname;
  const pageName = (route in routes ? routes[route] : routes['*']).toUpperCase();

  return (
    <header className={header}>
      <Wrapper style={wrapperStyle}>
        <h1>{pageName}</h1>

        <NavBar />
      </Wrapper>
    </header>
  );
}

export default withRouter(Header);
