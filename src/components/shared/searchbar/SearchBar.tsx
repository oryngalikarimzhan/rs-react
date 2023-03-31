import React, { FormEvent, useEffect, useRef, useState } from 'react';

import { searchBar } from './SearchBar.module.scss';
import SearchHistoryList from './components/search-history-list/SearchHistoryList';
import SearchForm from './components/search-form/SearchForm';
import {
  getFromLS,
  setToLS,
  deleteFromLS,
  LOCAL_STORAGE_LAST_SEARCH_KEY,
  LOCAL_STORAGE_HISTORY_KEY,
} from 'utils/index';

function SearchBar() {
  const [searchValue, setSearchValue] = useState(getFromLS(LOCAL_STORAGE_LAST_SEARCH_KEY)[0] || '');
  const [historyList, setHistoryList] = useState(getFromLS(LOCAL_STORAGE_HISTORY_KEY) || []);
  const [isFocused, setIsFocusing] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const searchHistory = getFromLS(LOCAL_STORAGE_HISTORY_KEY);

    if (searchValue !== '' && searchHistory.indexOf(searchValue) === -1) {
      searchHistory.push(searchValue);

      setHistoryList(setToLS(LOCAL_STORAGE_HISTORY_KEY, searchHistory));
    }
  };

  useEffect(() => {
    const handleWindowClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) setIsFocusing(false);
    };

    window.addEventListener('mousedown', handleWindowClick);

    return function cleanup() {
      setToLS(LOCAL_STORAGE_LAST_SEARCH_KEY, [searchValue]);
      window.removeEventListener('mousedown', handleWindowClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={searchBar} ref={ref}>
      <SearchForm {...{ handleSubmit, searchValue, setSearchValue, setIsFocusing }} />

      <SearchHistoryList
        historyList={historyList}
        isFocused={isFocused}
        onPick={(e) => setSearchValue(e.currentTarget.dataset.id as string)}
        onDelete={(e) =>
          setHistoryList(
            deleteFromLS(
              LOCAL_STORAGE_HISTORY_KEY,
              (e.target as HTMLButtonElement).dataset.id as string
            )
          )
        }
      />
    </div>
  );
}

export default SearchBar;
