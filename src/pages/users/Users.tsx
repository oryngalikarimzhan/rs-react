import React from 'react';

import styles from './Users.module.scss';
import { UserForm } from './features/userform/UserForm';

import { Catalog, Wrapper } from 'components/ui';
import { useAppSelector } from 'store';

const wrapperStyle = { rowGap: '20px', width: '40%' };

const { formPage, userForm, title, userCards } = styles;

export const Users: React.FC = () => {
  const users = useAppSelector((state) => state.users.list);

  const hasUsers = users && users.length > 0;

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

              <Catalog items={users} />
            </>
          )}
        </Wrapper>
      </section>
    </article>
  );
};
