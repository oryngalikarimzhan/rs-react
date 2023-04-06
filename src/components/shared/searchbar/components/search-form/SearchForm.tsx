import React, { Dispatch, FormEvent } from 'react';

import { searchForm, input } from './SearchForm.module.scss';
import { ButtonRegular } from 'components/ui/index';

interface SearchFormProps {
  handleSubmit: (e: FormEvent) => void;
  searchText: string;
  setSearchText: Dispatch<React.SetStateAction<string>>;
  setIsFocusing: Dispatch<React.SetStateAction<boolean>>;
}

const SearchForm = ({
  handleSubmit,
  searchText,
  setSearchText,
  setIsFocusing,
}: SearchFormProps) => (
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
      value={searchText}
      onClick={() => setSearchText('')}
      onChange={(e) => e.target.value !== '' && setSearchText(e.target.value)}
    ></input>

    <ButtonRegular>Search</ButtonRegular>
  </form>
);

export default SearchForm;
