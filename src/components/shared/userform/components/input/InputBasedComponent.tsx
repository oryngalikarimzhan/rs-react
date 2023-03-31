import React, { ReactElement } from 'react';

import styles, { inputCheckableWrapper } from './InputBasedComponent.module.scss';

import {
  CheckableUncontrolled,
  SingleUncontrolled,
} from 'components/shared/userform/helpers/types';
import { capitalizeText } from 'utils/index';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
}

const SimpleInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, id, placeholder, accept }, ref) => (
    <input
      ref={ref}
      {...{
        type,
        id,
        name: id,
        placeholder: placeholder || capitalizeText(id as string),
        accept,
      }}
      className={styles[type]}
    />
  )
);

const SimpleCheckable = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, id, name = id, placeholder }, ref) => (
    <>
      <input ref={ref} {...{ id, name, type }} className={styles[type]} />

      <label style={{ color: 'var(--main-color)' }} htmlFor={id}>
        {placeholder || capitalizeText(id as string)}
      </label>
    </>
  )
);

const InputBasedComponent = (props: CheckableUncontrolled | SingleUncontrolled): ReactElement => {
  const { type } = props;

  if (type === 'checkbox' || type === 'radio') {
    const { set } = props as CheckableUncontrolled;

    if (set.length > 1) {
      return (
        <>
          {set.map(({ id, refer, name = id, label }) => (
            <div key={id} className={inputCheckableWrapper}>
              <SimpleCheckable ref={refer} {...{ id, name, type, placeholder: label }} />
            </div>
          ))}
        </>
      );
    }

    if (set.length === 1) {
      const [{ id, refer, name = id, label }] = set;

      return <SimpleCheckable ref={refer} {...{ id, name, type, placeholder: label }} />;
    }
  }

  const { refer } = props as SingleUncontrolled;

  return <SimpleInput ref={refer as React.RefObject<HTMLInputElement>} {...props} />;
};

export default InputBasedComponent;
