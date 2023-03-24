import React, { ReactElement } from 'react';

import styles from './input.module.scss';
import type { UncontrolledProps } from '../CustomUncontrolledFormComponent';
import { parseText } from '../../../../utils/utils';

type InputProps = Pick<
  UncontrolledProps,
  'id' | 'type' | 'placeholder' | 'set' | 'accept' | 'refer'
>;

const SimpleInput = React.forwardRef<HTMLInputElement, InputProps & { name: string }>(
  ({ type, id, name, placeholder, accept }, ref) => {
    return (
      <input ref={ref} {...{ type, id, name, placeholder, accept }} className={styles[type]} />
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

const InputBasedComponent = ({
  id,
  type,
  set,
  placeholder,
  accept,
  refer,
}: InputProps): ReactElement => {
  if (set && set.length > 1) {
    return (
      <>
        {set.map(({ uniqueId, refer, name, labelText }) => (
          <div key={uniqueId} className={styles.inputCheckableWrapper}>
            <SimpleCheckable
              ref={refer}
              id={uniqueId}
              name={name || uniqueId}
              type={type}
              placeholder={labelText}
            />
          </div>
        ))}
      </>
    );
  }

  if (set && set.length === 1) {
    const { uniqueId, refer, name, labelText } = set[0];

    return (
      <SimpleCheckable
        ref={refer}
        id={uniqueId}
        name={name || uniqueId}
        type={type}
        placeholder={labelText}
      />
    );
  }

  return (
    <SimpleInput
      ref={refer as React.RefObject<HTMLInputElement>}
      name={id as string}
      {...{ id, type, accept }}
      placeholder={placeholder || (id && parseText(id))}
    />
  );
};

export default InputBasedComponent;
