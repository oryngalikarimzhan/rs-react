import React from 'react';

import { about, lorem } from './About.module.scss';
import { loremIpsum } from 'data';

export const About: React.FC = () => {
  return (
    <section className={about}>
      <p data-testid="lorem" className={lorem}>
        {loremIpsum.text.repeat(50)}
      </p>
    </section>
  );
};
