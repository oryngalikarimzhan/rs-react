import React, { ReactNode } from 'react';
import CSS from 'csstype';

import { wrapper } from './Wrapper.module.scss';

type WrapperProps = {
  children: ReactNode;
  style?: CSS.Properties;
};

export const Wrapper: React.FC<WrapperProps> = ({ children, style = {} }) => (
  <div style={style} className={wrapper}>
    <>{children}</>
  </div>
);
