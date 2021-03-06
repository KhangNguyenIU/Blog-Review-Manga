export const exceprtCut = (block) => {
  let i: number = 0;
  let result: string = '';
  while (i<block.length) {
    if (block[i].type == 'unstyled' || block[i].type == 'blockquote') {
      let string = block[i].text;
      if (string.length <= 100) {
        result = string + '...';
      } else {
        string =string.substr(0,100)
        let spaceIndex = string.lastIndexOf(' ');
        result = string.substr(0, spaceIndex) + '...';
      }
      break
    }
    i++;
  }
  return result;
};

export const smartStringCut = (string, length): string => {
  if (string.length <= length) return string + '...';

  let spaceIndex = string.lastIndexOf(' ');
  return string.substr(0, spaceIndex) + '...';
};
