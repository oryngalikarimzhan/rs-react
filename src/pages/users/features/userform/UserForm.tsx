import React from 'react';

import { Form, type FormFieldProps, type FormValues } from 'components/shared';
import { countries } from 'data';
import { useActions } from '../../../../store';

interface UserFormValues extends FormValues {
  firstname: string;
  lastname: string;
  birthday: string;
  gender: string;
  image: FileList;
  country: string;
  'personal-data': boolean | string;
}

const countryNames = countries.map((country) => country.name);

export const UserForm: React.FC = () => {
  const { addUser } = useActions();

  const onSubmit = (data: FormValues) => {
    const { firstname, lastname, birthday, gender, image, country } = data as UserFormValues;

    const reader = new FileReader();

    reader.onload = () =>
      addUser({
        id: crypto.randomUUID(),
        name: firstname,
        surname: lastname,
        birthday: birthday,
        gender: gender,
        image: reader.result as string,
        country: country,
      });

    reader.readAsDataURL(image[0]);
  };

  const template = {
    title: 'User Form',
    fields: [
      {
        type: 'text',
        title: 'First name',
        name: 'firstname',
        validationProps: {
          required: 'First name is mandatory',
          minLength: {
            value: 2,
            message: 'First name should contain more than 1 character',
          },
          pattern: {
            value: /^[A-Z][a-z]+$/,
            message:
              'First name should start with capital letter and can not contain numbers and signs',
          },
        },
      },
      {
        type: 'text',
        title: 'Last name',
        name: 'lastname',
        validationProps: {
          required: 'Last name is mandatory',
          minLength: {
            value: 2,
            message: 'Last name should contain more than 1 character',
          },
          pattern: {
            value: /^[A-Z][a-z]+$/,
            message:
              'Last name should start with capital letter and can not contain numbers and signs',
          },
        },
      },
      {
        type: 'date',
        title: 'Date of birth',
        name: 'birthday',
        validationProps: {
          required: 'Date of birth is mandatory',
          validate: (value) => {
            const [year, month, day] = value.split('-');
            const date = new Date(+year, +month - 1, +day);

            if (date > new Date()) return 'Date of birth cannot be in the future';
          },
        },
      },
      {
        type: 'radio',
        title: 'Gender',
        name: 'gender',
        ids: { male: 'Male', female: 'Female' },
        validationProps: {
          required: 'Gender is mandatory',
        },
      },
      {
        type: 'file',
        title: 'Photo',
        name: 'image',
        accept: 'image/*',
        validationProps: {
          required: 'Photo is mandatory',
        },
      },
      {
        type: 'select',
        title: 'Country',
        name: 'country',
        options: countryNames,
        validationProps: {
          required: 'You have to choose country',
        },
      },
      {
        type: 'checkbox',
        title: 'Personal data processing',
        name: 'personal-data',
        ids: { 'personal-data': 'I concent' },
        validationProps: {
          required: 'You have to consent to continue',
        },
      },
    ] as FormFieldProps[],
    successMessage: 'user has been created successfully',
  };

  return <Form {...{ template, onSubmit }} />;
};
