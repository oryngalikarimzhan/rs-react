import React, { RefObject } from 'react';

import styles from './CustomUncontrolledComponent.module.scss';

import InputBasedComponent from './input/InputBasedComponent';
import SelectBasedComponent from './select/SelectBasedComponent';

export interface SingleUncontrolled extends React.InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'date' | 'file';
  id: string;
  refer: RefObject<HTMLInputElement>;
  msg: string;
}

export interface SelectUncontrolled extends React.InputHTMLAttributes<HTMLSelectElement> {
  type: 'select';
  refer: RefObject<HTMLSelectElement>;
  msg: string;
  options: string[];
  id: string;
  placeholder: string;
}

export interface CheckableUncontrolled extends React.InputHTMLAttributes<HTMLInputElement> {
  type: 'radio' | 'checkbox';
  msg: string;
  set: {
    refer: RefObject<HTMLInputElement>;
    id: string;
    name?: string;
    label?: string;
  }[];
}

export type Uncontrolled = SingleUncontrolled | CheckableUncontrolled | SelectUncontrolled;

const CustomUncontrolledComponent = (props: Uncontrolled) => {
  const { msg, refer } = props as SelectUncontrolled;
  return (
    <div className={styles.uncontrolledWrapper}>
      {isSelectUncontrolled(props) ? (
        <SelectBasedComponent ref={refer} {...props} />
      ) : (
        <InputBasedComponent {...props} />
      )}
      <span className={styles.errorMessage}>{msg}</span>
    </div>
  );
};

const isSelectUncontrolled = (props: Uncontrolled): props is SelectUncontrolled => {
  return props.type === 'select';
};

export default CustomUncontrolledComponent;
