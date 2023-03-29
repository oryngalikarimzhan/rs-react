import { RefObject } from 'react';

export type Uncontrolled = SingleUncontrolled | CheckableUncontrolled | SelectUncontrolled;

export interface SingleUncontrolled extends React.InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'date' | 'file';
  id: string;
  refer: RefObject<HTMLInputElement>;
  msg: string;
}

export interface SelectUncontrolled extends React.InputHTMLAttributes<HTMLSelectElement> {
  type: 'select';
  refer: RefObject<HTMLSelectElement>;
  msg: string;
  options: string[];
  id: string;
  placeholder: string;
}

export interface CheckableUncontrolled extends React.InputHTMLAttributes<HTMLInputElement> {
  type: 'radio' | 'checkbox';
  msg: string;
  set: {
    refer: RefObject<HTMLInputElement>;
    id: string;
    name?: string;
    label?: string;
  }[];
}

export type RefValues = {
  name?: string;
  surname?: string;
  birthday?: string;
  male?: boolean;
  female?: boolean;
  image?: string;
  country?: string;
  personal?: boolean;
};
