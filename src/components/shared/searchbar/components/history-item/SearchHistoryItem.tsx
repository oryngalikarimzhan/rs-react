import React from 'react';
import { useActions } from 'store';

import styles from './SearchHistoryItem.module.scss';

interface SearchHistoryItemProps {
  searchValue: string;
}

const { history, text, deleteBtn } = styles;

const SearchHistoryItem: React.FC<SearchHistoryItemProps> = ({ searchValue }) => {
  const { deleteFromHistory, changeSearchValue } = useActions();

  return (
    <div className={history}>
      <span
        data-id={searchValue}
        className={text}
        onClick={() => changeSearchValue({ searchValue })}
      >
        {searchValue}
      </span>

      <button
        data-id={searchValue}
        className={deleteBtn}
        onClick={() => deleteFromHistory({ searchValue })}
      />
    </div>
  );
};

export default SearchHistoryItem;
