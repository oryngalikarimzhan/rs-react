import React from 'react';

import styles from './card.module.scss';
import User from '../../dto/User';
import type { CharacterCutted } from '../../pages/home/Home';
import { isUrl } from '../../utils/utils';

interface CardProps<T extends CharacterCutted | User> {
  data: T;
}

export default class Card<T extends CharacterCutted | User> extends React.Component<CardProps<T>> {
  state = { hovered: false, img: '' };

  componentDidMount() {
    const { image } = this.props.data;
    if (isUrl(image)) {
      const reader = new FileReader();

      reader.onload = () => this.setState({ img: reader.result as string });

      fetch(image)
        .then((data) => data.blob())
        .then((blob) => reader.readAsDataURL(blob))
        .catch((err) => console.error(err));
    }
  }

  render() {
    const { img, hovered } = this.state;
    const { image, ...rest } = this.props.data;

    const { card, border, title, infoBox, info } = styles;

    const backgroundImg =
      img === '' && !isUrl(image) ? image : img !== '' && isUrl(image) ? img : false;

    const cardStyle = backgroundImg && {
      background: `url(${backgroundImg}) no-repeat`,
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
          <div className={title}>{rest.name}</div>
          <div className={infoBox}>
            {Object.entries(rest).map(([key, value]) => (
              <span className={info} key={key}>
                {key}: <strong>{value}</strong>
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export class CharacterCard extends Card<CharacterCutted> {}
export class UserCard extends Card<User> {}
