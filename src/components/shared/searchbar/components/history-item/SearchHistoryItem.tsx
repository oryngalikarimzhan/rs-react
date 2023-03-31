import React, { MouseEvent } from 'react';

import { history, text, deleteBtn } from './SearchHistoryItem.module.scss';

interface SearchHistoryItemProps {
  searchText: string;
  onPick: (e: MouseEvent<HTMLSpanElement>) => void;
  onDelete: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SearchHistoryItem = ({ searchText, onPick, onDelete }: SearchHistoryItemProps) => {
  return (
    <div className={history}>
      <span data-id={searchText} className={text} onClick={(e) => onPick(e)}>
        {searchText}
      </span>

      <button data-id={searchText} className={deleteBtn} onClick={(e) => onDelete(e)} />
    </div>
  );
};

export default SearchHistoryItem;
