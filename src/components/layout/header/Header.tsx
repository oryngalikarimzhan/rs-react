import React from 'react';
import { useLocation } from 'react-router-dom';
import CSS from 'csstype';

import styles from './Header.module.scss';
import { routes } from 'utils/constants';
import { NavBar } from 'components/shared';
import { Wrapper } from 'components/ui';

const wrapperStyle: CSS.Properties = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const pageName = (pathname in routes ? routes[pathname] : routes['*']).toUpperCase();

  return (
    <header className={styles.header}>
      <Wrapper style={wrapperStyle}>
        <h1>{pageName}</h1>

        <NavBar />
      </Wrapper>
    </header>
  );
};
