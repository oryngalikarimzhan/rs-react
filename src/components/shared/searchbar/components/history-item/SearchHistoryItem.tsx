import React from 'react';
import { useActions } from 'store';

import { history, text, deleteBtn } from './SearchHistoryItem.module.scss';

interface SearchHistoryItemProps {
  searchValue: string;
}

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
