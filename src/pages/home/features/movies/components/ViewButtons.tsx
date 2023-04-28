import React from 'react';

import styles from './ViewButtons.module.scss';
import { View } from 'utils/types';
import { ButtonRounded } from 'components/ui';

interface ViewButtonProps {
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
}

const { views, listView, gridView } = styles;
export const ViewButtons: React.FC<ViewButtonProps> = ({ view, setView }) => {
  return (
    <div className={views}>
      <ButtonRounded id="list" isActive={view === 'list'} onClick={() => setView('list')}>
        <div className={listView} />
      </ButtonRounded>
      <ButtonRounded id="grid" isActive={view === 'grid'} onClick={() => setView('grid')}>
        <div className={gridView} />
      </ButtonRounded>
    </div>
  );
};
