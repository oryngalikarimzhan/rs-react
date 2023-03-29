import React from 'react';

import { select } from './SelectBasedComponent.module.scss';
import { SelectUncontrolled } from 'components/shared/userform/helpers/types';

const SelectBasedComponent = React.forwardRef<HTMLSelectElement, SelectUncontrolled>(
  ({ id, options, placeholder }, ref) => {
    return (
      <select ref={ref} {...{ id, name: id }} className={select}>
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
