import React, { useEffect, useState } from 'react';

import { card, border, title, infoBox, info } from './Card.module.scss';
import { CardModel, CharacterCutted, User } from 'models/index';
import { isUrl } from 'utils/index';

interface CardProps<T extends CardModel> {
  data: T;
}

function Card<T extends CardModel>({ data }: CardProps<T>) {
  const [isHovered, setIsHovered] = useState(false);
  const [rawImage, setRawImage] = useState('');

  const { image, ...rest } = data;

  const isUrlImage = isUrl(image);

  useEffect(() => {
    if (isUrlImage) {
      const reader = new FileReader();

      reader.onload = () => setRawImage(reader.result as string);

      fetch(image)
        .then((data) => data.blob())
        .then((blob) => reader.readAsDataURL(blob))
        .catch((err) => console.error(err));
    }
  }, [isUrlImage, image]);

  const backgroundImg =
    rawImage === '' && !isUrlImage ? image : rawImage !== '' && isUrlImage ? rawImage : false;

  const cardStyle = backgroundImg && {
    background: `url(${backgroundImg}) no-repeat`,
    backgroundSize: `${isHovered ? 'auto 130%' : 'auto 100%'}`,
    backgroundPosition: `${isHovered ? 'left center' : 'center center}'}`,
  };

  return (
    <div
      data-testid="card"
      className={card}
      onMouseOut={() => setIsHovered(false)}
      onMouseOver={() => setIsHovered(true)}
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

export function CharacterCard(props: CardProps<CharacterCutted>) {
  return <Card<CharacterCutted> {...props} />;
}

export function UserCard(props: CardProps<User>) {
  return <Card<User> {...props} />;
}
