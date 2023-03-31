import React from 'react';

import { uncontrolledWrapper, errorMessage } from './CustomUncontrolledComponent.module.scss';

import InputBasedComponent from './input/InputBasedComponent';
import SelectBasedComponent from './select/SelectBasedComponent';
import { Uncontrolled, SelectUncontrolled } from 'components/shared/userform/helpers/types';

const CustomUncontrolledComponent = (props: Uncontrolled) => {
  const { msg } = props;

  return (
    <div className={uncontrolledWrapper}>
      {isSelectUncontrolled(props) ? (
        <SelectBasedComponent ref={props.refer} {...props} />
      ) : (
        <InputBasedComponent {...props} />
      )}

      <span className={errorMessage}>{msg}</span>
    </div>
  );
};

const isSelectUncontrolled = (props: Uncontrolled): props is SelectUncontrolled =>
  props.type === 'select';

export default CustomUncontrolledComponent;
