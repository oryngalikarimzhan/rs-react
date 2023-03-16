import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './main.module.scss';

import Home from '../../pages/home/Home';
import About from '../../pages/about/About';
import NotFound from '../../pages/notfound/NotFound';

export default class Main extends React.Component {
  render() {
    return (
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    );
  }
}
