import React from 'react';

import styles from './input.module.scss';

type InputProps = {
  id: string;
  type: string;
  name?: string;
  placeholder?: string;
};

const InputUncontrolled = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, name, placeholder }, ref) => {
    const label = id.split('-').join(' ');
    return (
      <>
        <input
          ref={ref}
          {...{ id, type, placeholder }}
          name={name || id}
          className={styles[type]}
          {...(type === 'file' && { accept: 'image/*' })}
        />
        {(type === 'checkbox' || type === 'radio') && (
          <label style={{ color: 'var(--main-color)' }} htmlFor={id}>
            {placeholder || label[0].toUpperCase() + label.slice(1)}
          </label>
        )}
      </>
    );
  }
);

export default InputUncontrolled;
