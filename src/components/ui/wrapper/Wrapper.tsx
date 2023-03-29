import React, { ReactNode } from 'react';
import CSS from 'csstype';

import { wrapper } from './Wrapper.module.scss';

class Wrapper extends React.Component<{
  children: ReactNode;
  style?: CSS.Properties;
}> {
  render() {
    return (
      <div style={this.props.style} className={wrapper}>
        {this.props.children}
      </div>
    );
  }
}

export default Wrapper;
