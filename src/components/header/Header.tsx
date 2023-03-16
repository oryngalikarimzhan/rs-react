import React from 'react';
import NavBar from '../navbar/NavBar';
import SearchBar from '../searchbar/SearchBar';
import styles from './header.module.scss';

export default class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <NavBar />
        <SearchBar />
      </header>
    );
  }
}
