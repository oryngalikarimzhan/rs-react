import React from 'react';

import styles from './select.module.scss';
import type { UncontrolledProps } from '../CustomUncontrolledFormComponent';

type SelectProps = Pick<UncontrolledProps, 'id' | 'options' | 'placeholder'>;

const SelectBasedComponent = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, options, placeholder }, ref) => {
    return (
      <select ref={ref} {...{ id, name: id }} className={styles.select}>
        <option value="">--- {placeholder} ---</option>
        {options?.map((option, index) => (
          <option key={`${option}_${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
);

export default SelectBasedComponent;
