import React from 'react';

import styles from './home.module.scss';
import Card from '../../components/card/Card';
import SearchBar from '../../components/searchbar/SearchBar';
import type { Character } from '../../types/Character';

import data from '../../data/data.json';
import marvel from '../../assets/Marvel_Logo.svg';
import Wrapper from '../../components/wrapper/Wrapper';

class Home extends React.Component {
  render(): React.ReactNode {
    const cards = (data.characters as Character[]).map((character) => (
      <Card key={character.name} {...character} />
    ));

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
