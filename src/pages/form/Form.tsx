import React, { useContext } from 'react';

import { formPage, userForm, title, userCards } from './Form.module.scss';
import { countries } from 'data/index';
import { UsersContext } from 'contexts/index';
import { CardList, Wrapper } from 'components/ui/index';
import { UserCard, UserForm } from 'components/shared/index';

const wrapperStyle = { rowGap: '20px', justifyContent: 'center' };

function Form() {
  const { users } = useContext(UsersContext);

  const hasUsers = users.length > 0;

  return (
    <article className={formPage}>
      <section className={userForm}>
        <Wrapper style={wrapperStyle}>
          <h3 className={title}>User form</h3>

          <UserForm countries={countries} />
        </Wrapper>
      </section>

      <section className={userCards} style={!hasUsers ? { padding: '0' } : {}}>
        <Wrapper style={wrapperStyle}>
          {hasUsers && (
            <>
              <h3 className={title} style={{ color: 'var(--primary-color)' }}>
                User cards
              </h3>

              <CardList items={users} render={(item) => <UserCard data={item} />} />
            </>
          )}
        </Wrapper>
      </section>
    </article>
  );
}

export default Form;
