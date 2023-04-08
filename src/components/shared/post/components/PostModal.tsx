import React, { FC } from 'react';

import { postModal, postImage, postContent, postName, info } from './PostModal.module.scss';
import { CardModel } from 'models';
import { camelCaseToWords, capitalizeText } from 'utils/helpers';

interface PostModalProps {
  data: CardModel;
}

const PostModal: FC<PostModalProps> = ({ data }) => {
  const { image, name, ...rest } = data;

  return (
    <div className={postModal} data-testid="postmodal">
      <img className={postImage} src={image} alt={name} />
      <div className={postContent}>
        <h3 className={postName}>{name}</h3>

        {Object.entries(rest).map(([key, value]) => (
          <p className={info} key={key}>
            {capitalizeText(camelCaseToWords(key))}: <span>{String(value)}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default PostModal;
