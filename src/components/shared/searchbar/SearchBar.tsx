/* eslint-disable react-hooks/exhaustive-deps */
import React, { FormEvent } from 'react';

import { searchBar } from './SearchBar.module.scss';
import SearchHistoryList from './components/search-history-list/SearchHistoryList';
import SearchForm from './components/search-form/SearchForm';

import { LoadingProgress } from 'components/ui';
import { useOuterClick } from 'hooks';
import { useActions, useAppSelector } from 'store';

interface SearchBarProps {
  isAvailable: boolean;
  searchData: () => void;
  isLoading: boolean;
  errorMessage: string | false;
}

export const SearchBar = ({ isAvailable, searchData, isLoading, errorMessage }: SearchBarProps) => {
  const searchValue = useAppSelector((state) => state.searchValue.value);
  const { addToHistory } = useActions();

  const { isFocusing, setIsFocusing, ref } = useOuterClick();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isAvailable) {
      searchData();
      addToHistory(searchValue);
    }
  };

  return (
    <div className={searchBar} ref={ref as React.RefObject<HTMLDivElement>}>
      {errorMessage && <span>{errorMessage}</span>}

      <LoadingProgress isLoading={isLoading} />

      <SearchForm {...{ handleSubmit, setIsFocusing, isLoading }} />

      <SearchHistoryList isFocusing={isFocusing} />
    </div>
  );
};
