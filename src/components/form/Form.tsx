import React, { createRef } from 'react';

import styles from './form.module.scss';
import ButtonRegular from '../button/ButtonRegular';
import type { Country } from '../../dto/Country';
import {
  default as Uncontrolled,
  type UncontrolledProps,
} from './uncontrolled-form-components/CustomUncontrolledFormComponent';

class Form extends React.Component<{ countries: Country[] }> {
  nameInput = createRef<HTMLInputElement>();
  surnameInput = createRef<HTMLInputElement>();
  birthdayInput = createRef<HTMLInputElement>();
  maleRadioButton = createRef<HTMLInputElement>();
  femaleRadioButton = createRef<HTMLInputElement>();
  imageInput = createRef<HTMLInputElement>();
  countrySelect = createRef<HTMLSelectElement>();
  personalCheckbox = createRef<HTMLInputElement>();

  formFields: UncontrolledProps[] = [
    {
      type: 'text',
      id: 'name',
      refer: this.nameInput,
    },
    {
      type: 'text',
      id: 'surname',
      refer: this.surnameInput,
    },
    {
      type: 'date',
      id: 'date-of-birth',
      refer: this.birthdayInput,
    },
    {
      type: 'radio',
      set: [
        {
          refer: this.maleRadioButton,
          id: 'male',
          name: 'gender',
        },
        {
          refer: this.femaleRadioButton,
          id: 'female',
          name: 'gender',
        },
      ],
    },
    {
      type: 'file',
      id: 'image',
      accept: 'image/*',
      refer: this.imageInput,
    },
    {
      type: 'select',
      id: 'country',
      refer: this.countrySelect,
      options: this.props.countries.map((country) => country.name),
      placeholder: 'Choose your country',
    },
    {
      type: 'checkbox',
      set: [
        {
          refer: this.personalCheckbox,
          id: 'personal-data',
          label: 'I consent to my personal data',
        },
      ],
    },
  ];

  render() {
    return (
      <form className={styles.form} onSubmit={(e) => this.handleSubmit(e)}>
        {this.formFields.map((field, i) => (
          <Uncontrolled key={`${field.type}-${i}`} {...field} />
        ))}
        <ButtonRegular>Submit</ButtonRegular>
      </form>
    );
  }

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (this.validateAll()) {
      console.log('aaaaaaa');
    }
  };

  private validateAll = (): boolean => {
    const nameValidity = this.validateNameOrSurname(this.nameInput, 'name');
    const surnameValidity = this.validateNameOrSurname(this.surnameInput, 'surname');
    const birthdayValidity = this.validateBirthDay(this.birthdayInput);
    const personalValidity = this.validatePersonalDataconsentment(this.personalCheckbox);
    const genderValidity = this.validateGender(this.maleRadioButton, this.femaleRadioButton);
    const imageValidity = this.validateImage(this.imageInput);
    const countryValidity = this.validateCountry(this.countrySelect);

    return (
      nameValidity &&
      surnameValidity &&
      birthdayValidity &&
      personalValidity &&
      genderValidity &&
      imageValidity &&
      countryValidity
    );
  };

  toggleMessage = (element: HTMLElement, message = '') => {
    if (element) element.textContent = message;
  };

  private validateNameOrSurname = (ref: React.RefObject<HTMLInputElement>, elementName: string) => {
    if (!ref.current) throw new Error(`${elementName} input ref do not have current`);

    if (ref.current.value.length === 0) {
      this.toggleMessage(
        ref.current.nextSibling as HTMLElement,
        `${elementName} field can not be empty`
      );
      return false;
    }

    if (!/^[A-Z][a-z]+$/.test(ref.current.value)) {
      this.toggleMessage(
        ref.current.nextSibling as HTMLElement,
        `${elementName} should start with capital letter and should not contain numbers and signs`
      );
      return false;
    }

    this.toggleMessage(ref.current.nextSibling as HTMLElement);
    return true;
  };

  private validateBirthDay = (ref: React.RefObject<HTMLInputElement>) => {
    if (!ref.current) throw new Error('date input ref do not have current');

    if (/^([0-9]{4})-(0[1-9]|1[0-2])-([0-2][1-9]|3[0-1])$/.test(ref.current.value)) {
      const [year, month, day] = ref.current.value.split('-');
      const date = new Date(+year, +month - 1, +day);
      const now = new Date();

      if (date > now) {
        this.toggleMessage(ref.current.nextSibling as HTMLElement, 'date cannot be in the future');
        return false;
      }

      this.toggleMessage(ref.current.nextSibling as HTMLElement);
      return true;
    }

    this.toggleMessage(ref.current.nextSibling as HTMLElement, 'birthday field can not be empty');
    return false;
  };

  private validatePersonalDataconsentment = (ref: React.RefObject<HTMLInputElement>) => {
    if (!ref.current) throw new Error(`Checkbox input ref do not have current`);

    if (!ref.current.checked) {
      this.toggleMessage(
        ref.current.nextSibling?.nextSibling as HTMLElement,
        'should be checked to continue'
      );
      return false;
    }
    this.toggleMessage(ref.current.nextSibling?.nextSibling as HTMLElement);
    return true;
  };

  private validateGender = (
    maleRef: React.RefObject<HTMLInputElement>,
    femaleRef: React.RefObject<HTMLInputElement>
  ) => {
    if (!maleRef.current) throw new Error(`male radio input ref do not have current`);
    if (!femaleRef.current) throw new Error(`female radio input ref do not have current`);

    if (!femaleRef.current.checked && !maleRef.current.checked) {
      this.toggleMessage(
        femaleRef.current.parentNode?.nextSibling as HTMLElement,
        'gender not selected'
      );
      return false;
    }
    this.toggleMessage(femaleRef.current.parentNode?.nextSibling as HTMLElement);
    return true;
  };

  private validateImage = (ref: React.RefObject<HTMLInputElement>) => {
    if (!ref.current) throw new Error(`image file input ref do not have current`);

    if (!ref.current.value || ref.current.value === '') {
      console.log('Select image');
      this.toggleMessage(ref.current.nextSibling as HTMLElement, 'image not selected');
      return false;
    }
    this.toggleMessage(ref.current.nextSibling as HTMLElement);
    return true;
  };

  private validateCountry = (ref: React.RefObject<HTMLSelectElement>) => {
    if (!ref.current) throw new Error(`country select ref do not have current`);

    if (ref.current.value === '') {
      console.log('Select country');
      this.toggleMessage(ref.current.nextSibling as HTMLElement, 'country not selected');
      return false;
    }
    this.toggleMessage(ref.current.nextSibling as HTMLElement);
    return true;
  };
}

export default Form;
