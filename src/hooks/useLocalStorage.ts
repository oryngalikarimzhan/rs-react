import { useState } from 'react';
import { deleteFromLS, getFromLS, setToLS } from 'utils/helpers';

function useLocalStorage(key: string) {
  const [storedValuesArray, setStoredValue] = useState(getFromLS(key) || []);

  const updateStoredValuesArray = (text: string, isDelete = false) => {
    if (text !== '') {
      if (!isDelete && text !== '') {
        const arrayValue = getFromLS(key);

        if (arrayValue.indexOf(text.toLowerCase()) === -1) {
          arrayValue.push(text);
          setStoredValue(setToLS(key, arrayValue));
        }
      } else {
        setStoredValue(deleteFromLS(key, text));
      }
    }
  };

  return [storedValuesArray, updateStoredValuesArray] as const;
}

export default useLocalStorage;
