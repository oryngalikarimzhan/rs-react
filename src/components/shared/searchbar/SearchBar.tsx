import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { searchContainer, searchBar, input } from './SearchBar.module.scss';
import SearchHistory from './components/SearchHistory';
import {
  getFromLS,
  setToLS,
  deleteFromLS,
  LOCAL_STORAGE_LAST_SEARCH_KEY,
  LOCAL_STORAGE_HISTORY_KEY,
} from 'utils/index';
import { ButtonRegular } from 'components/ui/index';

function SearchBar() {
  const [searchValue, setSearchValue] = useState(getFromLS(LOCAL_STORAGE_LAST_SEARCH_KEY)[0] || '');
  const [historyList, setHistoryList] = useState(getFromLS(LOCAL_STORAGE_HISTORY_KEY) || []);
  const [isFocusing, setIsFocusing] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleWindowClick = useCallback((event: Event) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) setIsFocusing(false);
  }, []);

  const handleHistoryClick = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => setSearchValue(e.currentTarget.dataset.id as string),
    []
  );

  const handleDelete = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setHistoryList(
      deleteFromLS(
        LOCAL_STORAGE_HISTORY_KEY,
        (event.target as HTMLButtonElement).dataset.id as string
      )
    );
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const searchHistory = getFromLS(LOCAL_STORAGE_HISTORY_KEY);

      if (searchValue !== '' && searchHistory.indexOf(searchValue) === -1) {
        searchHistory.push(searchValue);

        setHistoryList(setToLS(LOCAL_STORAGE_HISTORY_KEY, searchHistory));
      }
    },
    [searchValue]
  );

  const handleChange = useCallback(
    () => (e: ChangeEvent<HTMLInputElement>) => {
      e.target.value !== '' && setSearchValue(e.target.value);
    },
    []
  );

  useEffect(() => {
    window.addEventListener('mousedown', handleWindowClick);

    return function cleanup() {
      setToLS(LOCAL_STORAGE_LAST_SEARCH_KEY, [searchValue]);
      window.removeEventListener('mousedown', handleWindowClick);
    };
  }, [handleWindowClick, searchValue]);

  return (
    <div className={searchContainer} ref={ref}>
      <form
        role="searchform"
        onFocus={() => setIsFocusing(true)}
        className={searchBar}
        onSubmit={handleSubmit}
      >
        <input
          type="search"
          placeholder="..."
          className={input}
          value={searchValue}
          onClick={() => setSearchValue('')}
          onChange={handleChange()}
        ></input>

        <ButtonRegular>Search</ButtonRegular>
      </form>

      <SearchHistory
        historyList={historyList}
        isFocusing={isFocusing}
        onPick={handleHistoryClick}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default SearchBar;
