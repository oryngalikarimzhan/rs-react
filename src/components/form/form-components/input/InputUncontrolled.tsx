import React from 'react';

import styles from './input.module.scss';

type InputProps = {
  id: string;
  type: string;
  refer: React.RefObject<HTMLInputElement>;
  className?: string;
  name?: string;
  placeholder?: string;
};

class InputUncontrolled extends React.Component<InputProps> {
  render() {
    const { id, type, refer, className, name, placeholder } = this.props;

    return (
      <>
        <input
          ref={refer}
          id={id}
          type={type}
          name={name || id}
          placeholder={placeholder}
          className={styles[className || 'input']}
          {...(type === 'file' && { accept: 'image/*' })}
        />
        {(type === 'checkbox' || type === 'radio') && (
          <label style={{ color: 'var(--main-color)' }} htmlFor={id}>
            {id}
          </label>
        )}
      </>
    );
  }
}

export default InputUncontrolled;
