import React, { useContext } from 'react';

import { formPage, userForm, title, userCards } from './User.module.scss';
import UserForm from './components/UserForm';

import { UsersContext } from 'contexts/index';
import { CardList, Wrapper } from 'components/ui/index';
import { UserCard } from 'components/shared/index';

const wrapperStyle = { rowGap: '20px', width: '40%' };

function User() {
  const { users } = useContext(UsersContext);

  const hasUsers = users.length > 0;

  return (
    <article className={formPage}>
      <section className={userForm}>
        <Wrapper style={wrapperStyle}>
          <UserForm />
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

export default User;
