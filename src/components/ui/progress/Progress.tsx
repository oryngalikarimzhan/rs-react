import React from 'react';

import { loadingProgress } from './Progress.module.scss';

export const Progress: React.FC<{ isLoading?: boolean }> = ({ isLoading }) => (
  <div
    className={loadingProgress}
    style={isLoading ? { display: 'block' } : { display: 'none' }}
  ></div>
);
