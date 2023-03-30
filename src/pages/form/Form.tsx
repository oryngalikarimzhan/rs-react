import React, { useContext, useMemo } from 'react';

import { formPage, userForm, title, userCards, cards } from './Form.module.scss';
import { countries } from 'data/index';
import { UsersContext } from 'contexts/index';
import { Wrapper } from 'components/ui/index';
import { UserCard, UserForm } from 'components/shared/index';

function Form() {
  const { users, addUser } = useContext(UsersContext);

  const wrapperStyle = useMemo(() => ({ rowGap: '20px', justifyContent: 'center' }), []);
  const hasUsers = useMemo(() => users.length > 0, [users]);

  return (
    <article className={formPage}>
      <section className={userForm}>
        <Wrapper style={wrapperStyle}>
          <h3 className={title}>User form</h3>

          <UserForm countries={countries} onSubmit={addUser} />
        </Wrapper>
      </section>

      <section className={userCards} style={!hasUsers ? { padding: '0' } : {}}>
        <Wrapper style={wrapperStyle}>
          {hasUsers && (
            <h3 className={title} style={{ color: 'var(--primary-color)' }}>
              User cards
            </h3>
          )}

          <div role="user-cards" className={cards}>
            {hasUsers &&
              users.map((user, index) => (
                <UserCard key={`${user.name}_${user.surname}_${index}`} data={user} />
              ))}
          </div>
        </Wrapper>
      </section>
    </article>
  );
}

export default Form;
