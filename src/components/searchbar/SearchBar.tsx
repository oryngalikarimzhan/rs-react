import React, { FormEvent } from 'react';

import styles from './searchbar.module.scss';
import { getFromLS, setToLS, deleteFromLS } from '../../utils/localStorageUtils';

export default class SearchBar extends React.Component {
  static readonly LOCAL_STORAGE_HISTORY_KEY = 'search-history';

  private readonly LOCAL_STORAGE_LAST_SEARCH_KEY = 'last-search';

  state = {
    searchValue: getFromLS(this.LOCAL_STORAGE_LAST_SEARCH_KEY)[0],
    historyList: [],
    focused: false,
  };

  private ref = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.setState({
      historyList: getFromLS(SearchBar.LOCAL_STORAGE_HISTORY_KEY),
    });

    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
    setToLS(this.LOCAL_STORAGE_LAST_SEARCH_KEY, [this.state.searchValue]);
    this.setState({ searchValue: this.state.searchValue });

    document.removeEventListener('mousedown', this.handleClick);
  }

  render() {
    const { searchContainer, searchBar, searchInput, searchButton } = styles;

    return (
      <div className={searchContainer} ref={this.ref}>
        <form
          role="searchform"
          onFocus={() => this.setState({ focused: true })}
          className={searchBar}
          onSubmit={this.handleSubmit}
        >
          <input
            type="search"
            placeholder="..."
            className={searchInput}
            value={this.state.searchValue}
            onClick={() => this.setState({ searchValue: '' })}
            onChange={(e) =>
              e.target.value !== '' && this.setState({ searchValue: e.target.value })
            }
          ></input>
          <button className={searchButton}>Search</button>
        </form>
        {this.getHistoryContainer()}
      </div>
    );
  }

  private getHistoryContainer = () => {
    const { histories, history, text, deleteBtn } = styles;

    const { historyList, focused } = this.state;

    return (
      historyList.length > 0 &&
      focused && (
        <div role="histories" className={histories}>
          {historyList.map((searchText) => (
            <div key={searchText} className={history}>
              <span
                data-id={searchText}
                className={text}
                onClick={(e) => this.setState({ searchValue: e.currentTarget.dataset.id })}
              >
                {searchText}
              </span>
              <button
                data-id={searchText}
                className={deleteBtn}
                onClick={(e) => {
                  deleteFromLS(
                    SearchBar.LOCAL_STORAGE_HISTORY_KEY,
                    e.currentTarget.dataset.id as string
                  );
                  this.setState({ historyList: getFromLS(SearchBar.LOCAL_STORAGE_HISTORY_KEY) });
                }}
              ></button>
            </div>
          ))}
        </div>
      )
    );
  };

  private handleClick = (event: Event) => {
    if (this.ref.current && !this.ref.current.contains(event.target as HTMLElement)) {
      this.setState({ focused: false });
    }
  };

  private handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const searchHistory = getFromLS(SearchBar.LOCAL_STORAGE_HISTORY_KEY);

    const { searchValue } = this.state;
    if (searchValue !== '' && searchHistory.indexOf(searchValue) === -1) {
      searchHistory.push(searchValue);

      setToLS(SearchBar.LOCAL_STORAGE_HISTORY_KEY, searchHistory);
      this.setState({ historyList: searchHistory });
    }
  };
}
