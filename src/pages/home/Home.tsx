import React from 'react';
import Card from '../../components/card/Card';
import styles from './home.module.scss';
import data from '../../data/data.json';
import marvel from '../../assets/Marvel_Logo.svg';
import type { Character } from '../../types/Character';

class Home extends React.Component {
  state = {
    datas: data.characters as Character[],
    image: marvel,
  };

  render(): React.ReactNode {
    const cards = this.state.datas.map((character) => <Card key={character.name} {...character} />);
    return (
      <section className={styles.home}>
        <article className={styles.cardsContainer}>
          <img className={styles.logo} src={this.state.image} />
          <div role="cards" className={styles.cards}>
            {cards}
          </div>
        </article>
      </section>
    );
  }
}

export default Home;
