import React, { useEffect, useState } from 'react';

import { card, border, title, infoBox, info } from './Card.module.scss';
import { CardModel, CharacterCutted, User } from 'models/index';
import { isUrl } from 'utils/index';

interface CardProps<T extends CardModel> {
  data: T;
}

const fetchRawImage = async (
  image: string,
  setState: (value: React.SetStateAction<string>) => void
) => {
  try {
    const blob = await fetch(image).then((data) => data.blob());
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => setState(reader.result as string);
  } catch (err) {
    console.error(err);
  }
};

function Card<T extends CardModel>({ data }: CardProps<T>) {
  const [isHovered, setIsHovered] = useState(false);
  const [rawImage, setRawImage] = useState('');

  const { image, ...rest } = data;

  useEffect(() => {
    isUrl(image) ? fetchRawImage(image, setRawImage) : setRawImage(image);
  }, [image]);

  const cardStyle = rawImage !== '' && {
    background: `url(${rawImage}) no-repeat`,
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
        <div className={title}>{rest.name || ''}</div>
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
