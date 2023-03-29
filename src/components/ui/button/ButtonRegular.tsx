import React from 'react';
import CSS from 'csstype';

import { buttonRegular } from './ButtonRegular.module.scss';

class ButtonRegular extends React.Component<{
  children: string;
  style?: CSS.Properties;
}> {
  render() {
    return <button className={buttonRegular}>{this.props.children}</button>;
  }
}

export default ButtonRegular;
