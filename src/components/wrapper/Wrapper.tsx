import React, { ReactNode } from 'react';
import CSS from 'csstype';

import styles from './wrapper.module.scss';

class Wrapper extends React.Component<{
  children: ReactNode;
  style?: CSS.Properties;
}> {
  render() {
    return (
      <div style={this.props.style} className={styles.wrapper}>
        {this.props.children}
      </div>
    );
  }
}

export default Wrapper;
