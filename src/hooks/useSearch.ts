/* eslint-disable react-hooks/exhaustive-deps */
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
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    (text?: string) => {
      toggleIsPending();
      fetch(text && text.length > 0 ? searchUrl + text : defaultUrl)
        .then((response) => {
          if (!response.ok) throw Error('could not fetch the data for that resource');
          return response.json();
        })
        .then((data) => {
          setError(null);
          return data[fetchResultField];
        })
        .then((rsl) => {
          setSearchedData(rsl);
        })
        .catch((err) => setError(err.message))
        .finally(() => toggleIsPending());
    },
    [defaultUrl, fetchResultField, searchUrl, toggleIsPending]
  );

  useEffect(() => {
    fetchData(searchText);
  }, [isReady]);

  useEffect(() => {
    setToLS(LOCAL_STORAGE_LAST_SEARCH_KEY, [searchText]);
  }, [searchText]);

  return [searchText, setSearchText, fetchData, isPending, searchedData, error] as const;
};

export default useSearch;
