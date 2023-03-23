import React from 'react';

import Wrapper from '../../components/wrapper/Wrapper';
import Form from '../../components/form/Form';
import styles from './form-page.module.scss';

class FormPage extends React.Component {
  render() {
    return (
      <article className={styles.formPage}>
        <Wrapper>
          <section className={styles.userForm}>
            <h3>Form</h3>
            <Form />
          </section>
          <section className={styles.userCards}>
            adawfafefmiemwoem wefioewmifmowe wefmoweimfoimwe wemfiomwefim ewfmiowemf
          </section>
        </Wrapper>
      </article>
    );
  }
}

export default FormPage;
