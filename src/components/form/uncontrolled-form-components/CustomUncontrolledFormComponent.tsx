import React from 'react';

import styles from './custom-uncontrolled-form-component.module.scss';

import InputBasedComponent from './input/InputBasedComponent';
import SelectBasedComponent from './select/SelectBasedComponent';

type UncontrolledComponentTypes = 'text' | 'radio' | 'checkbox' | 'select' | 'date' | 'file';

export type UncontrolledProps = {
  type: UncontrolledComponentTypes;
  id?: string;
  refer?: React.RefObject<HTMLInputElement> | React.RefObject<HTMLSelectElement>;
  options?: string[];
  placeholder?: string;
  accept?: string;
  set?: {
    refer: React.RefObject<HTMLInputElement>;
    id: string;
    name?: string;
    label?: string;
  }[];
};

const UncontrolledFormComponent = ({ type, refer, ...rest }: UncontrolledProps) => {
  return (
    <div className={styles.uncontrolledWrapper}>
      {type !== 'select' ? (
        <InputBasedComponent {...{ type, refer, ...rest }} />
      ) : (
        <SelectBasedComponent ref={refer as React.RefObject<HTMLSelectElement>} {...{ ...rest }} />
      )}
      <span className={styles.errorMessage}></span>
    </div>
  );
};

export default UncontrolledFormComponent;
