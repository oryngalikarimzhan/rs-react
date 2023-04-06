import React, { Fragment, MouseEvent } from 'react';

import { histories } from './SearchHistoryList.module.scss';
import SearchHistoryItem from '../history-item/SearchHistoryItem';

type SeachHistoryProps = {
  historyList: string[];
  isFocusing: boolean;
  onPick: (e: MouseEvent<HTMLSpanElement>) => void;
  onDelete: (e: MouseEvent<HTMLButtonElement>) => void;
};

const SearchHistoryList = ({ historyList, isFocusing, onPick, onDelete }: SeachHistoryProps) => (
  <>
    {historyList.length > 0 && isFocusing && (
      <div role="histories" className={histories}>
        {historyList.map((searchText) => (
          <Fragment key={searchText}>
            <SearchHistoryItem {...{ searchText, onPick, onDelete }} />
          </Fragment>
        ))}
      </div>
    )}
  </>
);

export default SearchHistoryList;
