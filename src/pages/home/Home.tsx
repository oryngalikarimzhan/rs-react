import React from 'react';

import styles from './home.module.scss';
import SearchBar from '../../components/searchbar/SearchBar';
import Wrapper from '../../components/wrapper/Wrapper';
import Character from '../../dto/Character';
import { CharacterCard } from '../../components/card/Card';

import data from '../../data/marvel.json';
import marvel from '../../assets/Marvel_Logo.svg';

export type CharacterCutted = Pick<
  Character,
  'name' | 'actor' | 'image' | 'citizenship' | 'realname' | 'dateofbirth' | 'species'
>;

class Home extends React.Component {
  render(): React.ReactNode {
    const cards = (data.characters as Character[]).map(
      ({ name, actor, image, citizenship, realname, dateofbirth, species }) => (
        <CharacterCard
          key={name}
          data={{ name, actor, image, citizenship, realname, dateofbirth, species }}
        />
      )
    );

    return (
      <section className={styles.home}>
        <section className={styles.searchContainer}>
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
          <article className={styles.cardsContainer}>
            <img className={styles.logo} src={marvel} />
            <div role="cards" className={styles.cards}>
              {cards}
            </div>
          </article>
        </Wrapper>
      </section>
    );
  }
}

export default Home;
