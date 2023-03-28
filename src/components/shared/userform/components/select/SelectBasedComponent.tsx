import React from 'react';

import styles from './SelectBasedComponent.module.scss';
import { SelectUncontrolled } from '../CustomUncontrolledComponent';

const SelectBasedComponent = React.forwardRef<HTMLSelectElement, SelectUncontrolled>(
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
