import React from 'react';

import styles from './Progress.module.scss';

export const Progress: React.FC<{ isLoading?: boolean }> = ({ isLoading }) => (
  <div
    className={styles.loadingProgress}
    style={isLoading ? { display: 'block' } : { display: 'none' }}
  ></div>
);
