import React, { MouseEventHandler, ReactNode } from 'react';
import CSS from 'csstype';

import { buttonRegular } from './ButtonRegular.module.scss';

type ButtonRegularProps = {
  children: string | ReactNode;
  styles?: CSS.Properties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const ButtonRegular = ({ children = '', styles = {}, onClick }: ButtonRegularProps) => (
  <button className={buttonRegular} style={styles} onClick={onClick}>
    {children}
  </button>
);

export default ButtonRegular;
