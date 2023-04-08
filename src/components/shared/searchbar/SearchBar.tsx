/* eslint-disable react-hooks/exhaustive-deps */
import React, { FormEvent, useEffect } from 'react';

import { searchBar } from './SearchBar.module.scss';
import SearchHistoryList from './components/search-history-list/SearchHistoryList';
import SearchForm from './components/search-form/SearchForm';

import { LOCAL_STORAGE_HISTORY_KEY } from 'utils/constants';
import { LoadingProgress } from 'components/ui';
import { useOuterClick, useLocalStorage, useSearch } from 'hooks';

interface SearchBarProps<T> {
  onSearch: (data: T[]) => void;
  isReady: boolean;
  fetchResultField: string;
  searchUrl: string;
  defaultUrl: string;
}

export const SearchBar = <T,>({
  onSearch,
  isReady,
  fetchResultField,
  searchUrl,
  defaultUrl,
}: SearchBarProps<T>) => {
  const { isFocusing, setIsFocusing, ref } = useOuterClick();
  const [historyList, updateHistoryList] = useLocalStorage(LOCAL_STORAGE_HISTORY_KEY);
  const [searchText, setSearchText, fetchData, isPending, data, error] = useSearch<T>(
    searchUrl,
    fetchResultField,
    defaultUrl,
    isReady
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetchData(searchText);
    updateHistoryList(searchText);
  };

  useEffect(() => {
    onSearch(data);
  }, [data]);

  return (
    <div className={searchBar} ref={ref as React.RefObject<HTMLDivElement>}>
      {error && <span>{error}</span>}
      <LoadingProgress style={isPending ? { display: 'block' } : { display: 'none' }} />

      <SearchForm {...{ handleSubmit, searchText, setSearchText, setIsFocusing, isPending }} />

      <SearchHistoryList
        {...{ historyList, isFocusing }}
        onPick={(e) => setSearchText(e.currentTarget.dataset.id as string)}
        onDelete={(e) => updateHistoryList(e.currentTarget.dataset.id as string, true)}
      />
    </div>
  );
};
