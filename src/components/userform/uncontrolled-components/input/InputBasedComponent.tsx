import React, { ReactElement } from 'react';

import styles from './input.module.scss';
import type { SetUncontrolled, SingleUncontrolled } from '../CustomUncontrolledComponent';
import { parseText } from '../../../../utils/utils';

type InputProps = {
  type: string;
  id?: string;
  placeholder?: string;
  accept?: string;
  name?: string;
};

const SimpleInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, id, placeholder, accept }, ref) => {
    return (
      <input
        ref={ref}
        {...{ type, id, name: id, placeholder: placeholder || parseText(id as string), accept }}
        className={styles[type]}
      />
    );
  }
);

const SimpleCheckable = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, id, name = id, placeholder }, ref) => {
    return (
      <>
        <input ref={ref} {...{ id, name, type }} className={styles[type]} />
        <label style={{ color: 'var(--main-color)' }} htmlFor={id}>
          {placeholder || parseText(id as string)}
        </label>
      </>
    );
  }
);

const InputBasedComponent = (props: SetUncontrolled | SingleUncontrolled): ReactElement => {
  const { type } = props;

  if (type === 'checkbox' || type === 'radio') {
    const { set } = props as SetUncontrolled;

    if (set.length > 1) {
      return (
        <>
          {set.map(({ id, refer, name = id, label }) => (
            <div key={id} className={styles.inputCheckableWrapper}>
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
