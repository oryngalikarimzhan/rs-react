import React from 'react';

import { InputRegular } from 'components/shared/index';
import styles from '../Form.module.scss';

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
        {...registerReturn}
      />
      <span className={styles.errorMessage}>{errorMessage}</span>
    </div>
  </div>
);

export default RegularInputBasedField;
