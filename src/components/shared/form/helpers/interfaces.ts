import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

export type FormFieldProps = InputRegular | SelectRegular | InputCheckable;

export interface FormValues {
  [key: string]: string | boolean | FileList;
}

interface FormField {
  title: string;
  name: string;
  validationProps: RegisterOptions;
  registerReturn: UseFormRegisterReturn;
  errorMessage: string;
}

export interface InputRegular extends FormField {
  type: 'text' | 'date' | 'file';
  accept?: string;
}

export interface SelectRegular extends FormField {
  type: 'select';
  options: string[];
}

export interface InputCheckable extends FormField {
  type: 'radio' | 'checkbox';
  ids: { [key: string]: string };
}
