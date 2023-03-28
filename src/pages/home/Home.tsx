import React from 'react';

import styles from './home.module.scss';
import Card from '../../components/card/Card';
import SearchBar from '../../components/searchbar/SearchBar';
import type { Character } from '../../types/Character';

import data from '../../data/data.json';
import marvel from '../../assets/Marvel_Logo.svg';

class Home extends React.Component {
  render(): React.ReactNode {
    const cards = (data.characters as Character[]).map((character) => (
      <Card key={character.name} {...character} />
    ));

    return (
      <section className={styles.home}>
        <section className={styles.searchContainer}>
          <SearchBar />
        </section>
        <div className={styles.wrapper}>
          <article className={styles.cardsContainer}>
            <img className={styles.logo} src={marvel} />
            <div role="cards" className={styles.cards}>
              {cards}
            </div>
          </article>
        </div>
      </section>
    );
  }
}

export default Home;
