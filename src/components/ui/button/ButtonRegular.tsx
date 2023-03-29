import React from 'react';
import CSS from 'csstype';

import { buttonRegular } from './ButtonRegular.module.scss';

type ButtonRegularProps = {
  children: string;
  style?: CSS.Properties;
};

function ButtonRegular({ children, style }: ButtonRegularProps) {
  return (
    <button className={buttonRegular} style={style}>
      {children}
    </button>
  );
}

export default ButtonRegular;
