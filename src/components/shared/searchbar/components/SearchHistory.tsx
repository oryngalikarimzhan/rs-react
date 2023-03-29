import React from 'react';

import { histories, history, text, deleteBtn } from './SearchHistory.module.scss';

type SeachHistoryProps = {
  historyList: string[];
  focused: boolean;
  onPick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

class SearchHistory extends React.Component<SeachHistoryProps> {
  private handleClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    this.props.onPick(event);
  };

  private handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.props.onDelete(event);
  };

  render() {
    const { historyList, focused } = this.props;

    return (
      historyList.length > 0 &&
      focused && (
        <div role="histories" className={histories}>
          {historyList.map((searchText) => (
            <div key={searchText} className={history}>
              <span data-id={searchText} className={text} onClick={(e) => this.handleClick(e)}>
                {searchText}
              </span>
              <button
                data-id={searchText}
                className={deleteBtn}
                onClick={(e) => this.handleDelete(e)}
              />
            </div>
          ))}
        </div>
      )
    );
  }
}

export default SearchHistory;
