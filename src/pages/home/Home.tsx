import React from 'react';
import CSS from 'csstype';

import { home, searchContainer, cardsContainer, logo } from './Home.module.scss';
import { marvelLogo } from 'assets/index';
import { marvel } from 'data/index';

import { Character } from 'models/index';
import { Wrapper, CardList } from 'components/ui/index';
import { SearchBar, CharacterCard } from 'components/shared/index';
import { omitObjectKeys } from 'utils/index';

const cuttedMarvelData = (marvel.characters as Character[]).map((data) =>
  omitObjectKeys(data, 'affiliation', 'appearances')
);

const wrapperStyle: CSS.Properties = {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
};

function Home() {
  return (
    <section className={home}>
      <section className={searchContainer}>
        <Wrapper style={wrapperStyle}>
          <SearchBar />
        </Wrapper>
      </section>

      <Wrapper>
        <article className={cardsContainer}>
          <img className={logo} src={marvelLogo} />

          <CardList
            items={cuttedMarvelData}
            render={(item) => <CharacterCard data={item} />}
            style={{ gap: '100px' }}
          />
        </article>
      </Wrapper>
    </section>
  );
}

export default Home;
