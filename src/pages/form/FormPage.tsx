import React from 'react';

import styles from './form-page.module.scss';
import countries from '../../data/countries.json';
import Wrapper from '../../components/wrapper/Wrapper';
import UserForm from '../../components/userform/UserForm';
import UserCard from '../../components/usercards/UserCard';
import { UsersContext } from '../../components/UserContextProvider';

class FormPage extends React.Component {
  render() {
    const wrapperStyle = { rowGap: '20px' };
    return (
      <UsersContext.Consumer>
        {({ users, addUser }) => (
          <article className={styles.formPage}>
            <section className={styles.userForm}>
              <Wrapper style={wrapperStyle}>
                <h3 className={styles.title}>User form</h3>
                <UserForm countries={countries} onSubmit={addUser} />
              </Wrapper>
            </section>
            <section className={styles.userCards}>
              <Wrapper style={wrapperStyle}>
                {users.length > 0 && (
                  <h3 className={styles.title} style={{ color: 'var(--primary-color)' }}>
                    User cards
                  </h3>
                )}
                <div role="user-cards" className={styles.cards}>
                  {users.length > 0 &&
                    users.map((user) => (
                      <UserCard key={`${user.name}_${user.surname}`} {...user} />
                    ))}
                </div>
              </Wrapper>
            </section>
          </article>
        )}
      </UsersContext.Consumer>
    );
  }
}

export default FormPage;
