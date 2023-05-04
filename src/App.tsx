import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from 'components/layout';
import { About, Users, Home, NotFound } from 'pages';

import './index.scss';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="userform" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
