import React, { FormEvent } from 'react';

import styles from './SearchBar.module.scss';
import SearchHistory from './components/SearchHistory';
import { getFromLS, setToLS, deleteFromLS } from 'utils/index';
import { ButtonRegular } from 'components/ui/index';

class SearchBar extends React.Component {
  static readonly LOCAL_STORAGE_HISTORY_KEY = 'search-history';

  private readonly LOCAL_STORAGE_LAST_SEARCH_KEY = 'last-search';

  private ref = React.createRef<HTMLDivElement>();

  state = {
    searchValue: getFromLS(this.LOCAL_STORAGE_LAST_SEARCH_KEY)[0] || '',
    historyList: [],
    focused: false,
  };

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
    const { searchContainer, searchBar, input } = styles;

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
            className={input}
            value={this.state.searchValue}
            onClick={() => this.setState({ searchValue: '' })}
            onChange={(e) =>
              e.target.value !== '' && this.setState({ searchValue: e.target.value })
            }
          ></input>
          <ButtonRegular>Search</ButtonRegular>
        </form>
        <SearchHistory
          historyList={this.state.historyList}
          focused={this.state.focused}
          onPick={this.handleHistoryClick}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }

  private handleHistoryClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
    this.setState({ searchValue: e.currentTarget.dataset.id });

  private handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    deleteFromLS(
      SearchBar.LOCAL_STORAGE_HISTORY_KEY,
      (event.target as HTMLButtonElement).dataset.id as string
    );
    this.setState({ historyList: getFromLS(SearchBar.LOCAL_STORAGE_HISTORY_KEY) });
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

export default SearchBar;
