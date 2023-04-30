import { useCallback, useState } from 'react';

export function useToggle(defaultValue?: boolean): [boolean, () => void] {
  const [value, setValue] = useState(!!defaultValue);

  const toggle = useCallback(() => setValue((prevValue) => !prevValue), []);

  return [value, toggle];
}
