import { useEffect, useRef, useState } from 'react';

export const useOuterClick = <T extends HTMLElement>() => {
  const [isFocusing, setIsFocusing] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleWindowClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) setIsFocusing(false);
    };

    window.addEventListener('mousedown', handleWindowClick);

    return function () {
      window.removeEventListener('mousedown', handleWindowClick);
    };
  }, []);

  return { isFocusing, setIsFocusing, ref };
};
