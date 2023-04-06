import React, { Fragment } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import SelectBasedField from './SelectBasedField';
import CheckableInputBasedField from './CheckableInputBasedField';
import RegularInputBasedField from './RegularInputBasedField';

import { FormFieldProps, FormValues } from 'components/shared/index';

const FormFields = ({
  fields,
  register,
  errors,
}: {
  fields: FormFieldProps[];
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}) => (
  <>
    {fields.map((field, index) => {
      const { type, name, validationProps } = field;
      let rsl;

      const registerReturn = register(name, validationProps);
      const fieldError = errors?.[name];
      const errorMessage = (fieldError && fieldError?.message) || '';

      if (type === 'select') {
        const { options, ...rest } = field;
        rsl = <SelectBasedField {...{ options, ...rest, registerReturn, errorMessage }} />;
      } else if (type === 'radio' || type === 'checkbox') {
        const { ids, ...rest } = field;
        rsl = <CheckableInputBasedField {...{ ids, ...rest, registerReturn, errorMessage }} />;
      } else if (type === 'text' || type === 'file' || type === 'date') {
        const { accept, ...rest } = field;
        rsl = <RegularInputBasedField {...{ accept, ...rest, registerReturn, errorMessage }} />;
      }

      return <Fragment key={index}>{rsl}</Fragment>;
    })}
  </>
);

export default FormFields;
