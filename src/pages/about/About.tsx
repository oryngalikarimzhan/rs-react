import React from 'react';

import { about, lorem } from './About.module.scss';
import { loremIpsum } from 'data';

function About() {
  return (
    <section className={about}>
      <p data-testid="lorem" className={lorem}>
        {loremIpsum.text.repeat(50)}
      </p>
    </section>
  );
}

export default About;
