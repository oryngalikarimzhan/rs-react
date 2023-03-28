import React from 'react';

import { Wrapper } from 'components/ui/index';

class NotFound extends React.Component {
  render(): React.ReactNode {
    return (
      <Wrapper>
        <h2>Страница не найдена</h2>
      </Wrapper>
    );
  }
}

export default NotFound;
