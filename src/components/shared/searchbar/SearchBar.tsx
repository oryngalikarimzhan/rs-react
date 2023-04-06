/* eslint-disable react-hooks/exhaustive-deps */
import React, { FormEvent, useEffect } from 'react';

import { searchBar } from './SearchBar.module.scss';
import SearchHistoryList from './components/search-history-list/SearchHistoryList';
import SearchForm from './components/search-form/SearchForm';

import { LOCAL_STORAGE_HISTORY_KEY } from 'utils/index';
import { LoadingProgress } from 'components/ui/index';
import { useOuterClick, useLocalStorage, useSearch } from 'hooks/index';

interface SearchBarProps<T> {
  onSearch: (data: T[]) => void;
  isReady: boolean;
  fetchResultField: string;
  searchUrl: string;
  defaultUrl: string;
}

function SearchBar<T>({
  onSearch,
  isReady,
  fetchResultField,
  searchUrl,
  defaultUrl,
}: SearchBarProps<T>) {
  const { isFocusing, setIsFocusing, ref } = useOuterClick();
  const [historyList, updateHistoryList] = useLocalStorage(LOCAL_STORAGE_HISTORY_KEY);
  const [searchText, setSearchText, fetchData, isPending, data] = useSearch<T>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (searchText !== '') {
      fetchData(searchUrl + searchText, fetchResultField);
      updateHistoryList(searchText);
    }
  };

  useEffect(() => {
    fetchData(defaultUrl, fetchResultField);
  }, [isReady]);

  useEffect(() => {
    onSearch(data);
  }, [data]);

  return (
    <div className={searchBar} ref={ref as React.RefObject<HTMLDivElement>}>
      <LoadingProgress style={isPending ? { display: 'block' } : { display: 'none' }} />

      <SearchForm {...{ handleSubmit, searchText, setSearchText, setIsFocusing }} />

      <SearchHistoryList
        {...{ historyList, isFocusing }}
        onPick={(e) => setSearchText(e.currentTarget.dataset.id as string)}
        onDelete={(e) =>
          updateHistoryList((e.target as HTMLButtonElement).dataset.id as string, true)
        }
      />
    </div>
  );
}

export default SearchBar;
