import React from 'react';

import styles from './uncontrolled-component.module.scss';

import InputUncontrolled from './input/InputUncontrolled';
import SelectUncontrolled from './select/SelectUncontrolled';

type UncontrolledProps = {
  id: string;
  alterRef: React.RefObject<HTMLInputElement> | React.RefObject<HTMLSelectElement>;
  type?: string;
  options?: string[];
  name?: string;
  placeholder?: string;
  accept?: string;
};

const UncontrolledComponent = ({
  id,
  type,
  alterRef,
  name,
  options,
  placeholder,
}: UncontrolledProps) => {
  return (
    <div className={styles.uncontrolledWrapper}>
      {type ? (
        <InputUncontrolled
          ref={alterRef as React.RefObject<HTMLInputElement>}
          {...{ id, type, name, placeholder }}
        />
      ) : (
        <SelectUncontrolled
          ref={alterRef as React.RefObject<HTMLSelectElement>}
          {...{ id, options, placeholder }}
        />
      )}
      <span className={styles.errorMessage}></span>
    </div>
  );
};

export default UncontrolledComponent;
