import React from 'react';
import styles from './searchbar.module.scss';

export default class SearchBar extends React.Component {
  state = {
    value: '',
  };

  render() {
    return (
      <div className={styles.searchBar}>
        <input
          type="search"
          placeholder="..."
          className={styles.searchInput}
          onChange={(e) => this.setState({ value: e.target.value })}
        ></input>
        <button
          className={styles.searchButton}
          onClick={() => {
            window.localStorage.setItem('search-history', this.state.value);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}
