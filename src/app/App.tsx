import React from 'react';

import Main from '../components/main/Main';
import Header from '../components/header/Header';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <Header />
        <Main />
      </>
    );
  }
}

export default App;
