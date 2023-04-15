import { useCallback, useState } from 'react';

function useToggle(defaultValue?: boolean): [boolean, () => void] {
  const [value, setValue] = useState(!!defaultValue);

  const toggle = useCallback(() => setValue((prevValue) => !prevValue), []);

  return [value, toggle];
}

export default useToggle;
