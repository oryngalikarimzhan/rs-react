import React from 'react';
import CSS from 'csstype';

import styles from './Form.module.scss';
import { countries } from 'data/index';
import { UsersContext } from 'contexts/index';
import { Wrapper } from 'components/ui/index';
import { UserCard, UserForm } from 'components/shared/index';

class Form extends React.Component {
  render() {
    const wrapperStyle = { rowGap: '20px', justifyContent: 'center' };
    const { formPage, userForm, title, userCards, cards } = styles;

    return (
      <UsersContext.Consumer>
        {({ users, addUser }) => (
          <article className={formPage}>
            <section className={userForm}>
              <Wrapper style={wrapperStyle}>
                <h3 className={title}>User form</h3>
                <UserForm countries={countries} onSubmit={addUser} />
              </Wrapper>
            </section>
            <section
              className={userCards}
              style={users.length === 0 ? { padding: '0' } : ({} as CSS.Properties)}
            >
              <Wrapper style={wrapperStyle}>
                {users.length > 0 && (
                  <h3 className={title} style={{ color: 'var(--primary-color)' }}>
                    User cards
                  </h3>
                )}
                <div role="user-cards" className={cards}>
                  {users.length > 0 &&
                    users.map((user, index) => (
                      <UserCard key={`${user.name}_${user.surname}_${index}`} data={user} />
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

export default Form;
