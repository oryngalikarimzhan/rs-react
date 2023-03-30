import React, { MouseEvent, useCallback } from 'react';

import { histories, history, text, deleteBtn } from './SearchHistory.module.scss';

type SeachHistoryProps = {
  historyList: string[];
  isFocusing: boolean;
  onPick: (e: MouseEvent<HTMLSpanElement>) => void;
  onDelete: (e: MouseEvent<HTMLButtonElement>) => void;
};

function SearchHistory(props: SeachHistoryProps) {
  const { historyList, isFocusing, onPick, onDelete } = props;

  const handleClick = useCallback(
    () => (event: MouseEvent<HTMLSpanElement>) => onPick(event),
    [onPick]
  );

  const handleDelete = useCallback(
    () => (event: MouseEvent<HTMLButtonElement>) => onDelete(event),
    [onDelete]
  );

  return (
    <>
      {historyList.length > 0 && isFocusing && (
        <div role="histories" className={histories}>
          {historyList.map((searchText) => (
            <div key={searchText} className={history}>
              <span data-id={searchText} className={text} onClick={handleClick()}>
                {searchText}
              </span>

              <button data-id={searchText} className={deleteBtn} onClick={handleDelete()} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchHistory;
