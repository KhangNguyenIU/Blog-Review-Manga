export const exceprtCut = (block) => {
  // console.log('block', block);
  let i: number = 0;
  let result: string = '';
  while (true) {
    if (block[i].type == 'unstyled' || block[i].type == 'blockquote') {
      let string = block[i].text;
      console.log("string........", string)
      if (string.length <= 250) {
        result = string + '...';
      } else {
        string =string.substr(0,250)
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
