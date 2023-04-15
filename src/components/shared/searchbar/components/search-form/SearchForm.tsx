import React, { Dispatch, FormEvent } from 'react';

import { searchForm, input } from './SearchForm.module.scss';
import { ButtonRegular } from 'components/ui';
import { useActions, useAppSelector } from 'store';

interface SearchFormProps {
  handleSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  setIsFocusing: Dispatch<React.SetStateAction<boolean>>;
}

const SearchForm = ({ handleSubmit, isLoading, setIsFocusing }: SearchFormProps) => {
  const searchValue = useAppSelector((state) => state.searchValue.value);
  const { changeSearchValue } = useActions();

  return (
    <form
      role="searchform"
      onFocus={() => setIsFocusing(true)}
      className={searchForm}
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        placeholder="..."
        className={input}
        value={searchValue}
        onChange={(e) => changeSearchValue(e.target.value)}
        disabled={isLoading}
      ></input>

      <ButtonRegular isLoading={isLoading}>Search</ButtonRegular>
    </form>
  );
};

export default SearchForm;
