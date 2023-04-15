import React from 'react';

import { SelectRegular } from 'components/shared';
import styles from './FormFields.module.scss';

const SelectBasedField = ({
  name,
  title,
  type,
  options,
  registerReturn,
  errorMessage,
}: SelectRegular) => (
  <div className={styles.field}>
    <label htmlFor={name} className={styles.fieldTitle}>
      {title.toUpperCase()}
    </label>
    <div className={styles.fieldContent}>
      <select id={name} className={styles[type]} {...registerReturn} role={`${type}-${name}`}>
        <option value="">--- Not selected ---</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className={styles.errorMessage}>{errorMessage}</span>
    </div>
  </div>
);

export default SelectBasedField;
