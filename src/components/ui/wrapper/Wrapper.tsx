import React, { ReactNode } from 'react';
import CSS from 'csstype';

import { wrapper } from './Wrapper.module.scss';

type WrapperProps = {
  children: ReactNode;
  style?: CSS.Properties;
};

function Wrapper({ children, style }: WrapperProps) {
  return (
    <div style={style} className={wrapper}>
      <>{children}</>
    </div>
  );
}

export default Wrapper;
