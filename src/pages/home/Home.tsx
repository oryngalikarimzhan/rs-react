import React from 'react';
import Card from '../../components/card/Card';
import styles from './home.module.scss';
import data from '../../data/data.json';
import marvel from '../../../public/Marvel_Logo.svg';

class Home extends React.Component {
  render(): React.ReactNode {
    const cards = data.characters.map((character) => <Card key={character.name} {...character} />);
    return (
      <section className={styles.home}>
        <img className={styles.logo} src={marvel} />
        <div className={styles.cards}>{cards}</div>
      </section>
    );
  }
}

export default Home;
