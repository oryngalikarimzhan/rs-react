import React from 'react';

import styles from './About.module.scss';
import { loremIpsum } from 'data';

const { about, lorem } = styles;
export const About: React.FC = () => {
  return (
    <section className={about}>
      <p data-testid="lorem" className={lorem}>
        {loremIpsum.text.repeat(50)}
      </p>
    </section>
  );
};
