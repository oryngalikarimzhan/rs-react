import React, { createRef } from 'react';

import styles from './user-form.module.scss';
import ButtonRegular from '../button/ButtonRegular';
import type { Country } from '../../dto/Country';
import CustomUncontrolledComponent, {
  type SetUncontrolled,
  type SingleUncontrolled,
  type SelectUncontrolled,
} from './uncontrolled-components/CustomUncontrolledComponent';
import type { User } from '../../dto/User';

type UserFormProps = { countries: Country[]; onSubmit: (data: User) => void };

type RefValues = {
  name: string | undefined;
  surname: string | undefined;
  birthday: string | undefined;
  male: boolean | undefined;
  female: boolean | undefined;
  image: string | undefined;
  country: string | undefined;
  personal: boolean | undefined;
};

class UserForm extends React.Component<UserFormProps> {
  state = {
    showSuccess: false,
    nameMsg: '',
    surnameMsg: '',
    birthdayMsg: '',
    genderMsg: '',
    imageMsg: '',
    countryMsg: '',
    personalMsg: '',
  };

  nameInput = createRef<HTMLInputElement>();
  surnameInput = createRef<HTMLInputElement>();
  birthdayInput = createRef<HTMLInputElement>();
  maleRadioButton = createRef<HTMLInputElement>();
  femaleRadioButton = createRef<HTMLInputElement>();
  imageInput = createRef<HTMLInputElement>();
  countrySelect = createRef<HTMLSelectElement>();
  personalCheckbox = createRef<HTMLInputElement>();

  render() {
    const {
      nameMsg,
      surnameMsg,
      birthdayMsg,
      genderMsg,
      imageMsg,
      countryMsg,
      personalMsg,
      showSuccess,
    } = this.state;

    const { countries } = this.props;

    const nameProps: SingleUncontrolled = {
      type: 'text',
      id: 'name',
      refer: this.nameInput,
      msg: nameMsg,
    };

    const surnameProps: SingleUncontrolled = {
      type: 'text',
      id: 'surname',
      refer: this.surnameInput,
      msg: surnameMsg,
    };

    const birthdayProps: SingleUncontrolled = {
      type: 'date',
      id: 'date-of-birth',
      refer: this.birthdayInput,
      msg: birthdayMsg,
    };

    const genderProps: SetUncontrolled = {
      type: 'radio',
      set: [
        {
          name: 'gender',
          id: 'male',
          refer: this.maleRadioButton,
        },
        {
          name: 'gender',
          id: 'female',
          refer: this.femaleRadioButton,
        },
      ],
      msg: genderMsg,
    };

    const imageProps: SingleUncontrolled = {
      type: 'file',
      id: 'image',
      accept: 'image/*',
      refer: this.imageInput,
      msg: imageMsg,
    };

    const countryProps: SelectUncontrolled = {
      type: 'select',
      id: 'country',
      refer: this.countrySelect,
      options: countries.map((country) => country.name),
      placeholder: 'Choose your country',
      msg: countryMsg,
    };

    const personalProps: SetUncontrolled = {
      type: 'checkbox',
      set: [
        {
          id: 'personal-data',
          label: 'I consent to my personal data',
          refer: this.personalCheckbox,
        },
      ],
      msg: personalMsg,
    };

    return (
      <>
        <form className={styles.form} onSubmit={(e) => this.handleSubmit(e)}>
          <CustomUncontrolledComponent {...nameProps} />
          <CustomUncontrolledComponent {...surnameProps} />
          <CustomUncontrolledComponent {...birthdayProps} />
          <CustomUncontrolledComponent {...genderProps} />
          <CustomUncontrolledComponent {...imageProps} />
          <CustomUncontrolledComponent {...countryProps} />
          <CustomUncontrolledComponent {...personalProps} />
          <ButtonRegular>Submit</ButtonRegular>
        </form>
        <span
          className={styles.successMessage}
          style={showSuccess ? { display: 'block' } : { display: 'none' }}
        >
          user has been created successfully
        </span>
      </>
    );
  }

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = {
      name: this.nameInput.current?.value,
      surname: this.surnameInput.current?.value,
      birthday: this.birthdayInput.current?.value,
      male: this.maleRadioButton.current?.checked,
      female: this.femaleRadioButton.current?.checked,
      image: this.imageInput.current?.value,
      country: this.countrySelect.current?.value,
      personal: this.personalCheckbox.current?.checked,
    };

    if (this.validateAll(values)) {
      this.props.onSubmit({
        name: values.name as string,
        surname: values.surname as string,
        birthday: values.birthday as string,
        gender: values.male ? 'male' : 'female',
        image: this.imageInput.current?.files?.[0] as File,
        country: values.country as string,
      });

      this.resetValues();
      this.toggleSuccessMessage();
    }
  };

  private validateAll = ({
    name,
    surname,
    birthday,
    image,
    country,
    personal,
    male,
    female,
  }: RefValues): boolean => {
    const nameValidity = this.validateNameOrSurname('name', name);
    const surnameValidity = this.validateNameOrSurname('surname', surname);
    const birthdayValidity = this.validateBirthDay(birthday);
    const personalValidity = this.validateField(
      'should be checked to continue',
      'personal',
      personal
    );
    const genderValidity = this.validateGender(male, female);
    const imageValidity = this.validateField('image not selected', 'image', image);
    const countryValidity = this.validateField('country not selected', 'country', country);

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

  private resetValues = () => {
    (this.nameInput.current as HTMLInputElement).value = '';
    (this.surnameInput.current as HTMLInputElement).value = '';
    (this.birthdayInput.current as HTMLInputElement).value = '';
    (this.maleRadioButton.current as HTMLInputElement).checked = false;
    (this.femaleRadioButton.current as HTMLInputElement).checked = false;
    (this.imageInput.current as HTMLInputElement).value = '';
    (this.countrySelect.current as HTMLSelectElement).value = '';
    (this.personalCheckbox.current as HTMLInputElement).checked = false;
  };

  private toggleSuccessMessage = () => {
    this.setState({ showSuccess: true });
    setTimeout(() => {
      this.setState({ showSuccess: false });
    }, 5000);
  };

  private validateNameOrSurname = (fieldName: 'name' | 'surname', value?: string) => {
    const regex = /^[A-Z][a-z]+$/;
    let errorMsg = '';

    if (!value) {
      errorMsg = `${fieldName} field can not be empty`;
    } else if (!regex.test(value)) {
      errorMsg = `${fieldName} should start with capital letter and should not contain numbers and signs`;
    }

    this.setState({ [`${fieldName}Msg`]: errorMsg });
    return !errorMsg;
  };

  private validateBirthDay = (value?: string) => {
    const dateRegex = /^([0-9]{4})-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/;
    let errorMsg = '';

    if (!value) {
      errorMsg = 'birthday field can not be empty';
    } else if (dateRegex.test(value)) {
      const [year, month, day] = value.split('-');
      const date = new Date(+year, +month - 1, +day);

      if (date > new Date()) {
        errorMsg = 'date cannot be in the future';
      }
    } else {
      errorMsg = 'Invalid date format. Expected format: yyyy-mm-dd';
    }

    this.setState({ birthdayMsg: errorMsg });
    return errorMsg === '';
  };

  private validateField = (warningMessage: string, fieldName: string, value?: boolean | string) => {
    let errorMsg = '';

    if (value === false || (typeof value === 'string' && value.trim() === '')) {
      errorMsg = warningMessage;
    }

    this.setState({ [`${fieldName}Msg`]: errorMsg });
    return errorMsg === '';
  };

  private validateGender = (maleValue?: boolean, femaleValue?: boolean) => {
    const message = maleValue || femaleValue ? '' : 'gender not selected';

    this.setState({ genderMsg: message });
    return message === '';
  };
}

export default UserForm;
