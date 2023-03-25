import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import About from './pages/about/About';
import NotFound from './pages/notfound/NotFound';
import FormPage from './pages/form/FormPage';
import UserContextProvider from './components/UserContextProvider';

class App extends React.Component {
  render() {
    return (
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </UserContextProvider>
    );
  }
}

export default App;
