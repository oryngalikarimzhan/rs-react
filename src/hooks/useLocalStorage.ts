import { useState } from 'react';
import { deleteFromLS, getFromLS, setToLS } from 'utils/index';

function useLocalStorage(key: string) {
  const [storedValuesArray, setStoredValue] = useState(getFromLS(key) || []);

  const updateStoredValuesArray = (text = '', isDelete = false) => {
    if (!isDelete) {
      const arrayValue = getFromLS(key);

      if (arrayValue.indexOf(text) === -1) {
        arrayValue.push(text);
        setStoredValue(setToLS(key, arrayValue));
      }
    } else {
      setStoredValue(deleteFromLS(key, text));
    }
  };

  return [storedValuesArray, updateStoredValuesArray] as const;
}

export default useLocalStorage;
