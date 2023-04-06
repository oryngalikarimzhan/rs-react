import { useEffect, useState } from 'react';
import { getFromLS, LOCAL_STORAGE_LAST_SEARCH_KEY, setToLS } from 'utils/index';
import { useToggle } from 'hooks/index';

const useSearch = <T>() => {
  const [searchText, setSearchText] = useState(getFromLS(LOCAL_STORAGE_LAST_SEARCH_KEY)[0] || '');
  const [isPending, toggleIsPending] = useToggle(false);
  const [searchedData, setSearchedData] = useState<T[]>([]);

  const fetchData = (url: string, fieldName: string) => {
    toggleIsPending();
    fetch(url)
      .then((response) => response.json())
      .then((data) => data[fieldName])
      .then((rsl) => {
        setSearchedData(rsl);
        toggleIsPending();
      });
  };

  useEffect(() => {
    return function () {
      setToLS(LOCAL_STORAGE_LAST_SEARCH_KEY, [searchText]);
    };
  }, [searchText]);

  return [searchText, setSearchText, fetchData, isPending, searchedData] as const;
};

export default useSearch;
