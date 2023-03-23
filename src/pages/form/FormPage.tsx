import React from 'react';

import Wrapper from '../../components/wrapper/Wrapper';
import Form from '../../components/form/Form';
import styles from './form-page.module.scss';
import countries from '../../data/countries.json';

class FormPage extends React.Component {
  render() {
    const wrapperStyle = { rowGap: '20px' };
    return (
      <article className={styles.formPage}>
        <section className={styles.userForm}>
          <Wrapper style={wrapperStyle}>
            <h3 className={styles.title}>User form</h3>
            <Form countries={countries} />
          </Wrapper>
        </section>
        <section className={styles.userCards}>
          <Wrapper style={wrapperStyle}>
            <h3 className={styles.title} style={{ color: 'var(--primary-color)' }}>
              User cards
            </h3>
            adawfafefmiemwoem wefioewmifmowe wefmoweimfoimwe wemfiomwefim ewfmiowemf
          </Wrapper>
        </section>
      </article>
    );
  }
}

export default FormPage;
