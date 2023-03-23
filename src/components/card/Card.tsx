import React from 'react';
import type { Character } from '../../dto/Character';
import styles from './card.module.scss';

export default class Card extends React.Component<Character> {
  state = { hovered: false, img: '' };

  componentDidMount() {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      this.setState({ img: reader.result as string });
    });

    fetch(this.props.image)
      .then((data) => data.blob())
      .then((blob) => reader.readAsDataURL(blob))
      .catch((err) => console.error(err));
  }

  render() {
    const {
      name,
      realname,
      actor,
      dateofbirth,
      citizenship,
      species,
      affiliation: [first],
    } = this.props;

    const { card, border, title, infoBox, info } = styles;

    const { img, hovered } = this.state;

    const cardStyle = img !== '' && {
      background: `url(${img}) no-repeat`,
      backgroundSize: `${hovered ? 'auto 130%' : 'auto 100%'}`,
      backgroundPosition: `${hovered ? 'left center' : 'center center}'}`,
    };

    return (
      <div
        data-testid="card"
        className={card}
        onMouseOut={() => this.setState({ hovered: false })}
        onMouseOver={() => this.setState({ hovered: true })}
        style={cardStyle || {}}
      >
        <div className={border}>
          <div className={title}>{name}</div>
          <div className={infoBox}>
            <span className={info}>
              Real name: <strong>{realname}</strong>
            </span>
            <span className={info}>
              Date of birth: <strong>{dateofbirth}</strong>
            </span>
            <span className={info}>
              Citizenship: <strong>{citizenship}</strong>
            </span>
            <span className={info}>
              Species: <strong>{species}</strong>
            </span>
            <span className={info}>
              Team: <strong>{first}</strong>
            </span>
            <span className={info}>
              Actor: <strong>{actor}</strong>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
