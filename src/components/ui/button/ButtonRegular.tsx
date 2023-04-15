import React, { MouseEventHandler, ReactNode } from 'react';
import CSS from 'csstype';

import { buttonRegular } from './ButtonRegular.module.scss';

type ButtonRegularProps = {
  children: string | ReactNode;
  styles?: CSS.Properties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
};

export const ButtonRegular: React.FC<ButtonRegularProps> = ({
  children = '',
  styles = {},
  onClick,
  isLoading,
}) => (
  <button className={buttonRegular} style={styles} onClick={onClick} disabled={isLoading}>
    {children}
  </button>
);
