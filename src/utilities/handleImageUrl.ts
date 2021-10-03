
export const isBase64Image = (url: String): boolean => {
  if (url.startsWith('data:image', 0)) return true;
  return false;
};
