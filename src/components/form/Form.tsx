import React, { createRef } from 'react';

import styles from './form.module.scss';
import ButtonRegular from '../button/ButtonRegular';
import type { Country } from '../../dto/Country';
import UncontrolledComponent from './form-components/UncontrolledComponent';

class Form extends React.Component<{ countries: Country[] }> {
  nameInput = createRef<HTMLInputElement>();
  surnameInput = createRef<HTMLInputElement>();
  birthdayInput = createRef<HTMLInputElement>();
  marriedCheckbox = createRef<HTMLInputElement>();
  maleRadioButton = createRef<HTMLInputElement>();
  femaleRadioButton = createRef<HTMLInputElement>();
  imageInput = createRef<HTMLInputElement>();
  countrySelect = createRef<HTMLSelectElement>();

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.femaleRadioButton.current?.nextSibling)
      (this.femaleRadioButton.current?.nextSibling?.nextSibling as HTMLElement).textContent =
        'HHHHHHH';
  };

  render() {
    return (
      <form className={styles.form} onSubmit={(e) => this.handleSubmit(e)}>
        <UncontrolledComponent alterRef={this.nameInput} id="name" type="text" placeholder="Name" />
        <UncontrolledComponent
          alterRef={this.surnameInput}
          id="surname"
          type="text"
          placeholder="Surname"
        />
        <UncontrolledComponent alterRef={this.birthdayInput} id="date-of-birth" type="date" />
        <UncontrolledComponent
          alterRef={this.maleRadioButton}
          id="male"
          name="gender"
          type="radio"
        />
        <UncontrolledComponent
          alterRef={this.femaleRadioButton}
          id="female"
          name="gender"
          type="radio"
        />
        <UncontrolledComponent alterRef={this.imageInput} id="image" type="file" accept="image/*" />
        <UncontrolledComponent
          alterRef={this.countrySelect}
          id="country-select"
          options={this.props.countries.map((country) => country.name)}
          placeholder="--- Choose your country ---"
        />
        <UncontrolledComponent
          alterRef={this.marriedCheckbox}
          id="personal-data"
          type="checkbox"
          placeholder="I consent to my personal data"
        />
        <ButtonRegular>Submit</ButtonRegular>
      </form>
    );
  }
}

export default Form;
