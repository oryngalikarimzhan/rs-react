export const getFromLS = (key: string): string[] =>
  JSON.parse(window.localStorage.getItem(key) || '[]');

export const setToLS = (key: string, arr: string[]) => {
  window.localStorage.setItem(key, JSON.stringify(arr));
  return arr;
};

export const deleteFromLS = (key: string, text: string) => {
  const searchHistory = getFromLS(key);
  searchHistory.splice(searchHistory.indexOf(text), 1);
  setToLS(key, searchHistory);
  return getFromLS(key);
};
