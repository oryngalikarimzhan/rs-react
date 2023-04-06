import React from 'react';
import CSS from 'csstype';

import { buttonRegular } from './ButtonRegular.module.scss';

type ButtonRegularProps = {
  children: string;
  style?: CSS.Properties;
};

const ButtonRegular = ({ children, style = {} }: ButtonRegularProps) => (
  <button className={buttonRegular} style={style}>
    {children}
  </button>
);

export default ButtonRegular;
