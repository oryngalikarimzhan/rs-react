import React, { Fragment } from 'react';

import { histories } from './SearchHistoryList.module.scss';
import SearchHistoryItem from '../history-item/SearchHistoryItem';
import { useAppSelector } from 'store';

type SearchHistoryProps = {
  isFocusing: boolean;
};

const SearchHistoryList: React.FC<SearchHistoryProps> = ({ isFocusing }) => {
  const historyList = useAppSelector((state) => state.searchHistory.list);

  return (
    <>
      {historyList.length > 0 && isFocusing && (
        <div role="histories" className={histories}>
          {historyList.map((searchValue) => (
            <Fragment key={searchValue}>
              <SearchHistoryItem searchValue={searchValue} />
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};
export default SearchHistoryList;
