import React, { Fragment, ReactNode } from 'react';
import CSS from 'csstype';

import styles from './Catalog.module.scss';
import { Card, Post } from 'components/shared';
import { CardModel } from 'models';
import { View } from 'utils/types';

interface ListProps<T extends CardModel> {
  items: T[];
  view?: View;
  style?: CSS.Properties;
}

const { grid, list } = styles;

export function Catalog<T extends CardModel>({ items, style, view = 'grid' }: ListProps<T>) {
  let render: (item: T, index?: number) => ReactNode;

  if (view === 'grid') render = (item: T) => <Card data={item} />;
  else render = (item: T, index = 0) => <Post data={item} index={index} />;

  return (
    <div className={view === 'grid' ? grid : list} style={style} role="catalog">
      {items.map((item, index) => (
        <Fragment key={index}>{render(item, index)}</Fragment>
      ))}
    </div>
  );
}
