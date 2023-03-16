import React from 'react';
import styles from './searchbar.module.scss';

export default class SearchBar extends React.Component {
  render() {
    return (
      <div className={styles.searchBar}>
        <input type="text" placeholder="..." className={styles.searchInput}></input>
        <button className={styles.searchButton}>Search</button>
      </div>
    );
  }
}
