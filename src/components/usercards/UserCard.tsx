import React from 'react';
import type { User } from '../../dto/User';
import styles from './user-card.module.scss';

export default class UserCard extends React.Component<User> {
  state = { hovered: false, img: '' };

  componentDidMount() {
    const reader = new FileReader();
    reader.onload = () => this.setState({ img: reader.result as string });
    reader.readAsDataURL(this.props.image);
  }

  render() {
    const { name, surname, birthday, gender, country } = this.props;

    const { card, border, title, infoBox, info } = styles;

    const { img, hovered } = this.state;

    const cardStyle = img !== '' && {
      background: `url(${img}) no-repeat`,
      backgroundSize: `${hovered ? 'auto 130%' : 'auto 100%'}`,
      backgroundPosition: `${hovered ? 'left center' : 'center center}'}`,
    };

    return (
      <div
        data-testid="user-card"
        className={card}
        onMouseOut={() => this.setState({ hovered: false })}
        onMouseOver={() => this.setState({ hovered: true })}
        style={cardStyle || {}}
      >
        <div className={border}>
          <div className={title}>{name}</div>
          <div className={infoBox}>
            <span className={info}>
              Name: <strong>{name}</strong>
            </span>
            <span className={info}>
              Surname: <strong>{surname}</strong>
            </span>
            <span className={info}>
              Date of birth: <strong>{birthday}</strong>
            </span>
            <span className={info}>
              Gender: <strong>{gender}</strong>
            </span>
            <span className={info}>
              Country: <strong>{country}</strong>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
