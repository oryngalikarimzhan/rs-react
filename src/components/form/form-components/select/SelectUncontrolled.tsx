import React from 'react';

import styles from './select.module.scss';

type SelectProps = {
  id: string;
  options?: string[];
  placeholder?: string;
};

const SelectUncontrolled = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, options, placeholder }, ref) => {
    return (
      <select ref={ref} id={id} name={id} className={styles.select}>
        <option value="not selected">{placeholder}</option>
        {options?.map((option, index) => (
          <option key={`${option}_${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
);

export default SelectUncontrolled;
