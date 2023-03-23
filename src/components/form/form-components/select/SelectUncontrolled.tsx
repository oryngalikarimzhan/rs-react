import React from 'react';

import styles from './select.module.scss';

type SelectProps = {
  id: string;
  refer: React.RefObject<HTMLSelectElement>;
  options: string[];
  placeholder: string;
  className?: string;
  name?: string;
};

class SelectUncontrolled extends React.Component<SelectProps> {
  render() {
    const { id, refer, options, placeholder, className, name } = this.props;

    return (
      <select ref={refer} id={id} name={name || id} className={styles[className || 'input']}>
        <option value="not selected">{placeholder}</option>
        {options.map((option, index) => (
          <option key={`${option}_${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
}

export default SelectUncontrolled;
