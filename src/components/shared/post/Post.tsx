import React, { useState } from 'react';

import { post, order, thumbnail, title } from './Post.module.scss';
import PostModal from './components/PostModal';

import { CardModel } from 'models';
import { Modal } from 'components/shared';

interface PostProps {
  data: CardModel;
  index: number;
}

export const Post: React.FC<PostProps> = ({ data, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { image, name } = data;

  const onClose = () => setIsOpen(false);

  return (
    <>
      <div data-testid="post" className={post} onClick={() => setIsOpen(true)}>
        <div className={order}>{index + 1}</div>
        <img className={thumbnail} src={image} />
        <div className={title}>{name || ''}</div>
      </div>
      <Modal {...{ isOpen, onClose }}>
        <PostModal data={data} />
      </Modal>
    </>
  );
};
