import React, { Dispatch, FormEvent } from 'react';

import styles from './SearchForm.module.scss';
import { ButtonRegular } from 'components/ui';
import { useActions, useAppSelector } from 'store';

interface SearchFormProps {
  handleSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  setIsFocusing: Dispatch<React.SetStateAction<boolean>>;
}

const { searchForm, input } = styles;

const SearchForm: React.FC<SearchFormProps> = ({ handleSubmit, isLoading, setIsFocusing }) => {
  const searchValue = useAppSelector((state) => state.searchValue.value);
  const { changeSearchValue } = useActions();

  return (
    <form
      role="search-form"
      onFocus={() => setIsFocusing(true)}
      className={searchForm}
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        placeholder="..."
        className={input}
        value={searchValue}
        onChange={(e) => changeSearchValue({ searchValue: e.target.value })}
        disabled={isLoading}
        role="search-input"
      ></input>

      <ButtonRegular isLoading={isLoading}>Search</ButtonRegular>
    </form>
  );
};

export default SearchForm;
