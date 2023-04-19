/* eslint-disable react-hooks/exhaustive-deps */
import React, { FormEvent } from 'react';

import styles from './SearchBar.module.scss';
import SearchHistoryList from './components/search-history-list/SearchHistoryList';
import SearchForm from './components/search-form/SearchForm';

import { Progress } from 'components/ui';
import { useOuterClick } from 'hooks';
import { useActions, useAppSelector } from 'store';

interface SearchBarProps {
  isAvailable: boolean;
  onSearch: () => void;
  isLoading: boolean;
  errorMessage: string | false;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  isAvailable,
  onSearch,
  isLoading,
  errorMessage,
}) => {
  const searchValue = useAppSelector((state) => state.searchValue.value);
  const { addToHistory } = useActions();

  const { isFocusing, setIsFocusing, ref } = useOuterClick();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isAvailable) {
      onSearch();
      addToHistory({ searchValue });
    }
  };

  return (
    <div className={styles.searchBar} ref={ref as React.RefObject<HTMLDivElement>}>
      {errorMessage && <span>{errorMessage}</span>}

      <Progress isLoading={isLoading} />

      <SearchForm {...{ handleSubmit, setIsFocusing, isLoading }} />

      <SearchHistoryList isFocusing={isFocusing} />
    </div>
  );
};
