import React, { useState } from 'react';

import { card, border, title, infoBox, info } from './Card.module.scss';
import { CardModel } from 'models/index';
import { camelCaseToWords, capitalizeText } from 'utils/index';

interface CardProps {
  data: CardModel;
}

export function Card({ data }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { image, name, ...rest } = data;

  const cardStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: `${isHovered ? '130% auto' : '100% auto'}`,
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
        <div className={title}>{name || ''}</div>

        <div className={infoBox}>
          {Object.entries(rest).map(([key, value]) => (
            <span className={info} key={key}>
              {capitalizeText(camelCaseToWords(key))}: <strong>{value as string}</strong>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
