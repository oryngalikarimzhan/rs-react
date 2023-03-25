import React, { ReactElement } from 'react';

import styles from './input.module.scss';
import type { UncontrolledProps } from '../CustomUncontrolledFormComponent';
import { parseText } from '../../../../utils/utils';

type InputProps = Pick<
  UncontrolledProps,
  'id' | 'type' | 'placeholder' | 'set' | 'accept' | 'refer'
>;

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

const SimpleCheckable = React.forwardRef<HTMLInputElement, InputProps & { name: string }>(
  ({ type, id, name, placeholder }, ref) => {
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

const InputBasedComponent = ({ type, set, refer, ...rest }: InputProps): ReactElement => {
  if (set && set.length > 1) {
    return (
      <>
        {set.map(({ id: uniqueId, refer: uniqueRef, name, label }) => (
          <div key={uniqueId} className={styles.inputCheckableWrapper}>
            <SimpleCheckable
              ref={uniqueRef}
              {...{ id: uniqueId, name: name || uniqueId, type, placeholder: label }}
            />
          </div>
        ))}
      </>
    );
  }

  if (set && set.length === 1) {
    const [{ id: uniqueId, refer: uniqueRef, name, label }] = set;

    return (
      <SimpleCheckable
        ref={uniqueRef}
        {...{ id: uniqueId, name: name || uniqueId, type, placeholder: label }}
      />
    );
  }

  return <SimpleInput ref={refer as React.RefObject<HTMLInputElement>} {...{ ...rest, type }} />;
};

export default InputBasedComponent;
