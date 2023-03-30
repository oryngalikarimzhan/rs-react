import React, { useMemo } from 'react';

import { home, searchContainer, cardsContainer, logo, cards } from './Home.module.scss';
import { marvelLogo } from 'assets/index';
import { marvel } from 'data/index';

import { Character } from 'models/index';
import { Wrapper } from 'components/ui/index';
import { SearchBar, CharacterCard } from 'components/shared/index';

function Home() {
  const cardsList = useMemo(
    () =>
      (marvel.characters as Character[]).map(
        ({ name, actor, image, citizenship, realname, dateofbirth, species }) => (
          <CharacterCard
            key={name}
            data={{ name, actor, image, citizenship, realname, dateofbirth, species }}
          />
        )
      ),
    []
  );

  return (
    <section className={home}>
      <section className={searchContainer}>
        <Wrapper
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <SearchBar />
        </Wrapper>
      </section>

      <Wrapper>
        <article className={cardsContainer}>
          <img className={logo} src={marvelLogo} />

          <div role="cards" className={cards}>
            {cardsList}
          </div>
        </article>
      </Wrapper>
    </section>
  );
}

export default Home;
