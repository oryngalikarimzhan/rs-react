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
    uniqueId: string;
    name?: string;
    labelText?: string;
  }[];
};

const UncontrolledFormComponent = ({
  id,
  type,
  refer,
  set,
  options,
  placeholder,
}: UncontrolledProps) => {
  return (
    <div className={styles.uncontrolledWrapper}>
      {type !== 'select' ? (
        <InputBasedComponent {...{ id, type, set, placeholder, refer }} />
      ) : (
        <SelectBasedComponent
          ref={refer as React.RefObject<HTMLSelectElement>}
          {...{ id, options, placeholder }}
        />
      )}
      <span className={styles.errorMessage}></span>
    </div>
  );
};

export default UncontrolledFormComponent;
