export const parseText = (text: string) =>
  (text[0].toUpperCase() + text.slice(1)).split('-').join(' ');

export const isUrl = (url: string) => {
  const urlRegex = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  return urlRegex.test(url);
};
