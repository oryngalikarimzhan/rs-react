import React from 'react';
import CSS from 'csstype';

import styles from './ButtonRegular.module.scss';

class ButtonRegular extends React.Component<{
  children: string;
  style?: CSS.Properties;
}> {
  render() {
    return <button className={styles.buttonRegular}>{this.props.children}</button>;
  }
}

export default ButtonRegular;
