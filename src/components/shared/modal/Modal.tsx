/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.scss';

import { ButtonRounded } from 'components/ui';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode | string;
}

const { overlay, modal, closeButton, modalContent, modalClose } = styles;
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className={overlay} onClick={onClose} role="modal" />
      <div className={modal}>
        <div className={modalContent}>{children}</div>
        <div className={modalClose}>
          <ButtonRounded onClick={onClose}>
            <div className={closeButton} />
          </ButtonRounded>
        </div>
      </div>
    </Portal>
  );
};

interface PortalProps {
  children: ReactNode | string;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const [portal] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(portal);
    return () => {
      document.body.removeChild(portal);
    };
  }, []);

  return ReactDOM.createPortal(children, portal);
};
