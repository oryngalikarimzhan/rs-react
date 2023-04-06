import React from 'react';
import { useLocation } from 'react-router-dom';
import CSS from 'csstype';

import { header } from './Header.module.scss';
import { routes } from 'utils/index';
import { NavBar } from 'components/shared/index';
import { Wrapper } from 'components/ui/index';

const wrapperStyle: CSS.Properties = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

function Header() {
  const { pathname } = useLocation();
  const pageName = (pathname in routes ? routes[pathname] : routes['*']).toUpperCase();

  return (
    <header className={header}>
      <Wrapper style={wrapperStyle}>
        <h1>{pageName}</h1>

        <NavBar />
      </Wrapper>
    </header>
  );
}

export default Header;
