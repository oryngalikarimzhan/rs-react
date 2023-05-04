import React, { Fragment } from 'react';

import { InputCheckable } from 'components/shared';
import styles from './FormFields.module.scss';

const CheckableInputBasedField = ({
  title,
  type,
  ids,
  registerReturn,
  errorMessage,
}: InputCheckable) => (
  <div className={styles.field}>
    <p className={styles.fieldTitle}>{title.toUpperCase()}</p>
    <div className={styles.fieldContent}>
      {Object.entries(ids).map(([k, v]) => (
        <Fragment key={k}>
          <input
            type={type}
            id={k}
            value={k}
            className={styles[type]}
            {...registerReturn}
            role={`${type}-${k}`}
          />

          <label htmlFor={k}>{v.toUpperCase()}</label>
        </Fragment>
      ))}
      <span
        id={`${registerReturn.name}-error-msg`}
        className={styles.errorMessage}
        style={{ top: '30px' }}
      >
        {errorMessage}
      </span>
    </div>
  </div>
);
export default CheckableInputBasedField;
