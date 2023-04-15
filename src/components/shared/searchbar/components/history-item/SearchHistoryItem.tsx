import React from 'react';
import { useActions } from 'store';

import { history, text, deleteBtn } from './SearchHistoryItem.module.scss';

interface SearchHistoryItemProps {
  searchValue: string;
}

const SearchHistoryItem = ({ searchValue }: SearchHistoryItemProps) => {
  const { deleteFromHistory, changeSearchValue } = useActions();

  return (
    <div className={history}>
      <span
        data-id={searchValue}
        className={text}
        onClick={(e) => changeSearchValue(e.currentTarget.dataset.id)}
      >
        {searchValue}
      </span>

      <button
        data-id={searchValue}
        className={deleteBtn}
        onClick={(e) => deleteFromHistory(e.currentTarget.dataset.id)}
      />
    </div>
  );
};

export default SearchHistoryItem;
