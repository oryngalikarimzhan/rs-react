import React from 'react';

import { views, listView, gridView } from './ViewButtons.module.scss';
import { View } from 'utils/types';
import { ButtonRounded } from 'components/ui';

interface ViewButtonProps {
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
}

export const ViewButtons: React.FC<ViewButtonProps> = ({ view, setView }) => {
  return (
    <div className={views}>
      <ButtonRounded isActive={view === 'list'} onClick={() => setView('list')}>
        <div className={listView} />
      </ButtonRounded>
      <ButtonRounded isActive={view === 'grid'} onClick={() => setView('grid')}>
        <div className={gridView} />
      </ButtonRounded>
    </div>
  );
};
