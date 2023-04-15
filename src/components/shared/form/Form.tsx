import React, { FC, useState } from 'react';
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

export const Form: FC<FormProps> = ({ template, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ mode: 'onSubmit' });
  const { title, fields, successMessage } = template;

  const [isSucces, setIsSucces] = useState(false);

  const onValid: SubmitHandler<FormValues> = (data, e) => {
    e?.preventDefault();
    onSubmit(data);

    setIsSucces(true);
    setTimeout(() => {
      setIsSucces(false);
    }, 5000);
    reset();
  };

  return (
    <form noValidate onSubmit={handleSubmit(onValid)} className={styles.form} role="reusable-form">
      {<h3 className={styles.title}>{title.toUpperCase()}</h3>}
      <FormFields {...{ fields, register, errors }} />
      <ButtonRegular styles={{ width: '30%', alignSelf: 'center' }}>SUBMIT</ButtonRegular>
      <p
        className={styles.successMessage}
        style={isSucces ? { display: 'block' } : { display: 'none' }}
      >
        {successMessage}
      </p>
    </form>
  );
};
