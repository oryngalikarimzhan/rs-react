import React from 'react';

import { post, order, thumbnail, title } from './Post.module.scss';

interface PostProps {
  data: CardModel;
  index: number;
}

function Post({ data, index }: PostProps) {
  const { image, name } = data;

  return (
    <div data-testid="post" className={post}>
      <div className={order}>{index + 1}</div>
      <img className={thumbnail} src={image} />
      <div className={title}>{name || ''}</div>
    </div>
  );
}

export default Post;
