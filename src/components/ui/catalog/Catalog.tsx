import React, { Fragment, ReactNode } from 'react';
import CSS from 'csstype';

import { grid, list } from './Catalog.module.scss';
import { Card, Post } from 'components/shared/index';
import { CardModel } from 'models/index';

interface ListProps<T extends CardModel> {
  items: T[];
  view: 'grid' | 'list';
  style?: CSS.Properties;
}

function Catalog<T extends CardModel>({ items, style, view = 'grid' }: ListProps<T>) {
  let render: (item: T, index?: number) => ReactNode;

  if (view === 'grid') render = (item: T) => <Card data={item} />;
  else render = (item: T, index = 0) => <Post data={item} index={index} />;

  return (
    <div className={view === 'grid' ? grid : list} style={style} role="Card">
      {items.map((item, index) => (
        <Fragment key={index}>{render(item, index)}</Fragment>
      ))}
    </div>
  );
}

export default Catalog;
