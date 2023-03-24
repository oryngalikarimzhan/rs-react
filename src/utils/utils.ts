export const parseText = (text: string) =>
  (text[0].toUpperCase() + text.slice(1)).split('-').join(' ');
