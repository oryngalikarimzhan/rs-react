import React from 'react';

import styles from './form.module.scss';
import ButtonRegular from '../button/ButtonRegular';
import InputUncontrolled from './form-components/input/InputUncontrolled';
import SelectUncontrolled from './form-components/select/SelectUncontrolled';

class Form extends React.Component {
  nameInput = React.createRef<HTMLInputElement>();
  surnameInput = React.createRef<HTMLInputElement>();
  birthdayInput = React.createRef<HTMLInputElement>();
  marriedCheckbox = React.createRef<HTMLInputElement>();
  maleRadioButton = React.createRef<HTMLInputElement>();
  femaleRadioButton = React.createRef<HTMLInputElement>();
  imageInput = React.createRef<HTMLInputElement>();
  select = React.createRef<HTMLSelectElement>();

  render() {
    return (
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          console.log(this.select.current?.value);
        }}
      >
        <InputUncontrolled refer={this.nameInput} id="name" type="text" placeholder="Name" />
        <InputUncontrolled
          refer={this.surnameInput}
          id="surname"
          type="text"
          placeholder="Surname"
        />
        <InputUncontrolled refer={this.birthdayInput} id="date-of-birth" type="date" />
        <InputUncontrolled
          refer={this.marriedCheckbox}
          id="married"
          type="checkbox"
          className="checkbox"
        />
        <InputUncontrolled
          refer={this.maleRadioButton}
          id="male"
          name="gender"
          type="radio"
          className="checkbox"
        />
        <InputUncontrolled
          refer={this.femaleRadioButton}
          id="female"
          name="gender"
          type="radio"
          className="checkbox"
        />
        <InputUncontrolled refer={this.imageInput} id="image" type="file" />

        <SelectUncontrolled
          refer={this.select}
          id="select"
          options={['1', '2', '3']}
          placeholder="--- Choose your country ---"
        />

        <ButtonRegular>Submit</ButtonRegular>
      </form>
    );
  }
}

export default Form;
