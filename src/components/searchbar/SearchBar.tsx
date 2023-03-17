import React, { FormEvent } from 'react';
import styles from './searchbar.module.scss';

export default class SearchBar extends React.Component {
  private readonly LOCAL_STORAGE_KEY = 'search-history';

  state = {
    searchValue: '',
    historyList: [],
    focused: false,
  };

  private ref = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.setState({ history: this.getHistoryFromLS() });
    document.addEventListener('mousedown', this.handleClick);
  }

  render() {
    const {
      searchContainer,
      searchBar,
      searchInput,
      searchButton,
      histories,
      history,
      text,
      deleteBtn,
    } = styles;

    const { historyList, searchValue, focused } = this.state;

    const historiesContainer = historyList.length > 0 && focused && (
      <div className={histories}>
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
              onClick={(e) => this.deleteFromLS(e.currentTarget.dataset.id as string)}
            ></button>
          </div>
        ))}
      </div>
    );

    return (
      <div className={searchContainer} ref={this.ref}>
        <form
          onFocus={() => this.setState({ focused: true })}
          className={searchBar}
          onSubmit={this.handleSubmit}
        >
          <input
            type="search"
            placeholder="..."
            className={searchInput}
            value={searchValue}
            onClick={() => this.setState({ searchValue: '' })}
            onChange={(e) =>
              e.target.value !== '' && this.setState({ searchValue: e.target.value })
            }
          ></input>
          <button className={searchButton}>Search</button>
        </form>
        {historiesContainer}
      </div>
    );
  }

  private handleClick = (event: Event) => {
    if (this.ref.current && !this.ref.current.contains(event.target as HTMLElement)) {
      this.setState({ focused: false });
    }
  };

  private handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const searchHistory: string[] = this.getHistoryFromLS();

    const { searchValue } = this.state;
    if (searchValue !== '' && searchHistory.indexOf(searchValue) === -1) {
      searchHistory.push(searchValue);

      this.setHistoryToLS(searchHistory);
    }
  };

  private getHistoryFromLS = (): string[] =>
    JSON.parse(window.localStorage.getItem(this.LOCAL_STORAGE_KEY) || '[]');

  private setHistoryToLS = (history: string[]): void => {
    window.localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(history));
    this.setState({ historyList: history });
  };

  private deleteFromLS = (text: string) => {
    const searchHistory = this.getHistoryFromLS();
    searchHistory.splice(searchHistory.indexOf(text), 1);
    this.setHistoryToLS(searchHistory);
  };
}
