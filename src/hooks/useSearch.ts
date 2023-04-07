import { useEffect, useState, useCallback } from 'react';

import { getFromLS, setToLS } from 'utils/helpers';
import { LOCAL_STORAGE_LAST_SEARCH_KEY } from 'utils/constants';
import { useToggle } from 'hooks';

const useSearch = <T>(
  searchUrl: string,
  fetchResultField: string,
  defaultUrl: string,
  isReady: boolean
) => {
  const [searchText, setSearchText] = useState(getFromLS(LOCAL_STORAGE_LAST_SEARCH_KEY)[0] || '');
  const [isPending, toggleIsPending] = useToggle(false);
  const [searchedData, setSearchedData] = useState<T[]>([]);

  const fetchData = useCallback(
    (text?: string) => {
      toggleIsPending();
      fetch(text ? searchUrl + text : defaultUrl)
        .then((response) => response.json())
        .then((data) => data[fetchResultField])
        .then((rsl) => {
          setSearchedData(rsl);
          toggleIsPending();
        });
    },
    [defaultUrl, fetchResultField, searchUrl, toggleIsPending]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData, isReady]);

  useEffect(() => {
    setToLS(LOCAL_STORAGE_LAST_SEARCH_KEY, [searchText]);
  }, [searchText]);

  return [searchText, setSearchText, fetchData, isPending, searchedData] as const;
};

export default useSearch;
