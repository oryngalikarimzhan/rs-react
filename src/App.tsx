import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import classes from './App.module.scss';

import About from './pages/about/About';
import NotFound from './pages/notfound/NotFound';
import Home from './pages/home/Home';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <header className={classes.header}>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
  }
}

export default App;
