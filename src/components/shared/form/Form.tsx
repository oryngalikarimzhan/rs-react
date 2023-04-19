import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './Form.module.scss';
import FormFields from './components/FormFields';
import type { FormFieldProps, FormValues } from './helpers/interfaces';

import { ButtonRegular } from 'components/ui';

interface FormProps {
  template: {
    title: string;
    fields: FormFieldProps[];
    successMessage: string;
  };
  onSubmit: (data: FormValues) => void;
}

export const Form: React.FC<FormProps> = ({ template, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ mode: 'onSubmit' });
  const { title, fields, successMessage } = template;

  const [isSuccess, setIsSuccess] = useState(false);

  const onValid: SubmitHandler<FormValues> = (data, e) => {
    e?.preventDefault();
    onSubmit(data);

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
    reset();
  };

  return (
    <form noValidate onSubmit={handleSubmit(onValid)} className={styles.form} role="reusable-form">
      {<h3 className={styles.title}>{title.toUpperCase()}</h3>}
      <FormFields {...{ fields, register, errors }} />
      <ButtonRegular style={{ width: '30%', alignSelf: 'center' }}>SUBMIT</ButtonRegular>
      <p
        className={styles.successMessage}
        style={isSuccess ? { display: 'block' } : { display: 'none' }}
      >
        {successMessage}
      </p>
    </form>
  );
};
