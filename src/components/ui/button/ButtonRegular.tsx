import React, { MouseEventHandler, ReactNode } from 'react';
import CSS from 'csstype';

import styles from './ButtonRegular.module.scss';

type ButtonRegularProps = {
  children: string | ReactNode;
  style?: CSS.Properties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
};

export const ButtonRegular: React.FC<ButtonRegularProps> = ({
  children = '',
  style = {},
  onClick,
  isLoading,
}) => (
  <button className={styles.buttonRegular} style={style} onClick={onClick} disabled={isLoading}>
    {children}
  </button>
);
