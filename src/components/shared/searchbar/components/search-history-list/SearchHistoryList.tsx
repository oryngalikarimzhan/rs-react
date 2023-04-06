import React, { Fragment, MouseEvent } from 'react';

import { histories } from './SearchHistoryList.module.scss';
import SearchHistoryItem from '../history-item/SearchHistoryItem';

type SeachHistoryProps = {
  historyList: string[];
  isFocused: boolean;
  onPick: (e: MouseEvent<HTMLSpanElement>) => void;
  onDelete: (e: MouseEvent<HTMLButtonElement>) => void;
};

const SearchHistoryList = ({ historyList, isFocused, onPick, onDelete }: SeachHistoryProps) => (
  <>
    {historyList.length > 0 && isFocused && (
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
