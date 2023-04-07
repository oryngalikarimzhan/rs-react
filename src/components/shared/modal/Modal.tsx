import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import CSS from 'csstype';

import { overlay, modal, closeButton } from './Modal.module.scss';

import { ButtonRegular } from 'components/ui';

const portal = document.getElementById('portal');

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode | string;
}

const closeButtonStyles: CSS.Properties = {
  position: 'absolute',
  top: '15px',
  right: '-53px',
  width: '35px',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    portal &&
    ReactDOM.createPortal(
      <>
        <div className={overlay} onClick={onClose}></div>
        <div className={modal}>
          <ButtonRegular styles={closeButtonStyles} onClick={onClose}>
            <div className={closeButton} />
          </ButtonRegular>
          {children}
        </div>
      </>,
      portal
    )
  );
};
