import React, { createRef } from 'react';

import styles from './user-form.module.scss';
import ButtonRegular from '../button/ButtonRegular';
import type { Country } from '../../dto/Country';
import CustomUncontrolledComponent, {
  type UncontrolledProps,
} from './uncontrolled-components/CustomUncontrolledComponent';
import type { User } from '../../dto/User';

type UserFormProps = { countries: Country[]; onSubmit: (data: User) => void };

class UserForm extends React.Component<UserFormProps> {
  state = {
    isActive: false,
  };

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
      <>
        <form className={styles.form} onSubmit={(e) => this.handleSubmit(e)}>
          {this.formFields.map((field, i) => (
            <CustomUncontrolledComponent key={`${field.type}-${i}`} {...field} />
          ))}
          <ButtonRegular>Submit</ButtonRegular>
        </form>
        <span
          className={styles.successMessage}
          style={this.state.isActive ? { display: 'block' } : { display: 'none' }}
        >
          user created successfully
        </span>
      </>
    );
  }

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (this.validateAll()) {
      this.props.onSubmit({
        name: this.nameInput.current?.value as string,
        surname: this.surnameInput.current?.value as string,
        birthday: this.birthdayInput.current?.value as string,
        gender: this.maleRadioButton.current?.checked ? 'male' : 'female',
        image: this.imageInput.current?.files?.[0] as File,
        country: this.countrySelect.current?.value as string,
      });

      this.resetValues();
      this.toggleSuccessMessage();
    }
  };

  private validateAll = (): boolean => {
    const nameValidity = this.validateNameOrSurname(this.nameInput, 'name');
    const surnameValidity = this.validateNameOrSurname(this.surnameInput, 'surname');
    const birthdayValidity = this.validateBirthDay(this.birthdayInput);
    const personalValidity = this.validateField(
      this.personalCheckbox,
      'should be checked to continue',
      this.personalCheckbox.current?.nextSibling?.nextSibling as Node
    );
    const genderValidity = this.validateGender(this.maleRadioButton, this.femaleRadioButton);
    const imageValidity = this.validateField(this.imageInput, 'image not selected');
    const countryValidity = this.validateField(this.countrySelect, 'country not selected');

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

  private toggleErrorMessage = (node: Node | null, message: string) => {
    if (!node) throw new Error(`Element not found`);
    node.textContent = message;
    return message === '';
  };

  private resetValues = () => {
    (this.nameInput.current as HTMLInputElement).value = '';
    (this.surnameInput.current as HTMLInputElement).value = '';
    (this.birthdayInput.current as HTMLInputElement).value = '';
    (this.imageInput.current as HTMLInputElement).value = '';
    (this.personalCheckbox.current as HTMLInputElement).checked = false;
    (this.maleRadioButton.current as HTMLInputElement).checked = false;
    (this.femaleRadioButton.current as HTMLInputElement).checked = false;
    (this.countrySelect.current as HTMLSelectElement).value = '';
  };

  private toggleSuccessMessage = () => {
    this.setState({ isActive: true });
    setTimeout(() => {
      this.setState({ isActive: false });
    }, 5000);
  };

  private validateNameOrSurname = (
    ref: React.RefObject<HTMLInputElement>,
    elementName: 'name' | 'surname'
  ) => {
    if (!ref.current) throw new Error(`${elementName} input ref do not have current`);

    if (ref.current.value.length === 0) {
      return this.toggleErrorMessage(
        ref.current.nextSibling,
        `${elementName} field can not be empty`
      );
    }

    if (!/^[A-Z][a-z]+$/.test(ref.current.value)) {
      return this.toggleErrorMessage(
        ref.current.nextSibling,
        `${elementName} should start with capital letter and should not contain numbers and signs`
      );
    }

    return this.toggleErrorMessage(ref.current.nextSibling, '');
  };

  private validateBirthDay = (ref: React.RefObject<HTMLInputElement>) => {
    if (!ref.current) throw new Error('date input ref do not have current');

    if (/^([0-9]{4})-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/.test(ref.current.value)) {
      const [year, month, day] = ref.current.value.split('-');
      const date = new Date(+year, +month - 1, +day);
      let message = '';

      if (date > new Date()) {
        message = 'date cannot be in the future';
      }

      return this.toggleErrorMessage(ref.current.nextSibling, message);
    }

    return this.toggleErrorMessage(ref.current.nextSibling, 'birthday field can not be empty');
  };

  private validateField = (
    ref: React.RefObject<HTMLInputElement | HTMLSelectElement>,
    warningMessage: string,
    to?: Node
  ) => {
    const node = ref.current;

    if (!node) {
      throw new Error(`${ref}: do not have current`);
    }

    const message =
      node instanceof HTMLInputElement && node.type === 'checkbox'
        ? !node.checked && warningMessage
        : !node.value && warningMessage;

    const toNode = to || node.nextSibling;

    return this.toggleErrorMessage(toNode, message || '');
  };

  private validateGender = (
    maleRef: React.RefObject<HTMLInputElement>,
    femaleRef: React.RefObject<HTMLInputElement>
  ) => {
    if (!maleRef.current) throw new Error(`male radio input ref do not have current`);
    if (!femaleRef.current) throw new Error(`female radio input ref do not have current`);

    const message =
      femaleRef.current.checked || maleRef.current.checked ? '' : 'gender not selected';

    return this.toggleErrorMessage((femaleRef.current.parentNode as Node).nextSibling, message);
  };
}

export default UserForm;
