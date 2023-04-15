import React from 'react';
import CSS from 'csstype';

import { loadingProgress } from './LoadingProgress.module.scss';

const LoadingProgress = ({ style }: { style?: CSS.Properties }) => (
  <div className={loadingProgress} style={style}></div>
);

export default LoadingProgress;
