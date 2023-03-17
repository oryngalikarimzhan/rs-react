import React from 'react';
import type { Character } from '../../types';
import styles from './card.module.scss';

export default class Card extends React.Component<{ character: Character }, { hovered: boolean }> {
  constructor(props: { character: Character }) {
    super(props);
    this.state = { hovered: false };
  }

  render() {
    const character = this.props.character;
    const cardStyle = {
      background: `url(${character.image}) no-repeat`,
      backgroundSize: `${this.state.hovered ? 'auto 130%' : 'auto 100%'}`,
      backgroundPosition: `${this.state.hovered ? 'left center' : 'center center}'}`,
    };

    return (
      <div
        className={styles.card}
        onMouseOut={() => this.setState({ hovered: false })}
        onMouseOver={() => this.setState({ hovered: true })}
        style={cardStyle}
      >
        <div className={styles.border}>
          <div className={styles.title}>{character.name}</div>
          <div className={styles.info}>
            <span>
              Real name: <strong>{character.realname}</strong>
            </span>
            <span>
              Actor: <strong>{character.actor}</strong>
            </span>
            <span>
              Date of birth: <strong>{character.dateofbirth}</strong>
            </span>
            <span>
              Citizenship: <strong>{character.citizenship}</strong>
            </span>
            <span>
              Species: <strong>{character.species}</strong>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
