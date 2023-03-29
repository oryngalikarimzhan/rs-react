const isUrl = (url: string) => {
  const urlRegex = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  return urlRegex.test(url);
};

export default isUrl;
