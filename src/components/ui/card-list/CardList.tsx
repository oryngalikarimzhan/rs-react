import React, { Fragment, ReactNode } from 'react';
import CSS from 'csstype';

import { cards } from './CardList.module.scss';

interface CardListProps<T> {
  items: T[];
  render: (item: T) => ReactNode;
  style?: CSS.Properties;
}

function CardList<T>({ items, render, style }: CardListProps<T>) {
  return (
    <div className={cards} style={style} role="cards">
      {items.map((item, index) => (
        <Fragment key={index}>{render(item)}</Fragment>
      ))}
    </div>
  );
}

export default CardList;
