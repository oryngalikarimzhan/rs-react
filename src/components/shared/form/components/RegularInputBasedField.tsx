import React from 'react';

import { InputRegular } from 'components/shared';
import styles from './FormFields.module.scss';

const RegularInputBasedField = ({
  name,
  title,
  type,
  accept = '',
  registerReturn,
  errorMessage,
}: InputRegular) => (
  <div className={styles.field}>
    <label htmlFor={name} className={styles.fieldTitle}>
      {title}
    </label>
    <div className={styles.fieldContent}>
      <input
        type={type}
        id={name}
        accept={accept}
        placeholder={title}
        className={styles[type]}
        role={`${type}-${name}`}
        {...registerReturn}
      />
      <span className={styles.errorMessage}>{errorMessage}</span>
    </div>
  </div>
);

export default RegularInputBasedField;
