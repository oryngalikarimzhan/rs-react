import React from 'react';

import { loadingProgress } from './LoadingProgress.module.scss';

const LoadingProgress = ({ isLoading }: { isLoading?: boolean }) => (
  <div
    className={loadingProgress}
    style={isLoading ? { display: 'block' } : { display: 'none' }}
  ></div>
);

export default LoadingProgress;
