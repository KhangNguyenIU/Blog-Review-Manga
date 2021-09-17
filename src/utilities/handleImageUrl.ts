import { read } from 'fs';
import { resolve } from 'path';
import FileReader from 'filereader'
export const isBase64Image = (url: String): boolean => {
  if (url.startsWith('data:image', 0)) return true;
  return false;
};

export const blobToBase64 = (blobUrl: Blob): Promise<string | ArrayBuffer> => {
  const reader = new FileReader();
  reader.readAsDataURL(blobUrl);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};
