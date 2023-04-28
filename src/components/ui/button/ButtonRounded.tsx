import React, { ReactNode } from 'react';
import CSS from 'csstype';

import { ButtonRegular } from './ButtonRegular';

interface ButtonRoundedProps {
  children: ReactNode | string;
  onClick: () => void;
  isActive?: boolean;
  id?: string;
}

const roundedButtonStyles: CSS.Properties = {
  width: '35px',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const activeRoundedButtonStyle: CSS.Properties = {
  ...roundedButtonStyles,
  borderColor: 'lightcyan',
};

export const ButtonRounded: React.FC<ButtonRoundedProps> = ({
  children,
  onClick,
  id,
  isActive = false,
}) => {
  return (
    <ButtonRegular
      id={id}
      style={isActive ? activeRoundedButtonStyle : roundedButtonStyles}
      onClick={onClick}
    >
      {children}
    </ButtonRegular>
  );
};
