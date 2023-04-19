import React, { useState } from 'react';

import styles from './Card.module.scss';

import { CardModel } from 'models';
import { camelCaseToWords, capitalizeText } from 'utils/helpers';

interface CardProps {
  data: CardModel;
}

const { card, border, title, infoBox, info } = styles;

export const Card: React.FC<CardProps> = ({ data }) => {
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
          {Object.entries(rest).map(([key, value]) => {
            return (
              ((typeof value === 'string' && value.length < 50) || typeof value === 'number') && (
                <span className={info} key={key}>
                  {capitalizeText(camelCaseToWords(key))}: <strong>{value}</strong>
                </span>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};
