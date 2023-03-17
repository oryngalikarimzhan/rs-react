import React from 'react';
import Card from '../../components/card/Card';
import styles from './home.module.scss';
import data from '../../data/data.json';
import marvel from '../../assets/Marvel_Logo.svg';
import type { Character } from '../../types';

class Home extends React.Component<{ datas: Character[]; image: string }> {
  state = {
    datas: data.characters as Character[],
    image: marvel,
  };

  render(): React.ReactNode {
    const cards = this.state.datas.map((characterData) => (
      <Card key={characterData.name} character={characterData} />
    ));
    return (
      <section className={styles.home}>
        <article className={styles.cardsContainer}>
          <img className={styles.logo} src={this.state.image} />
          <div className={styles.cards}>{cards}</div>
        </article>
      </section>
    );
  }
}

export default Home;
