import { RequestHeader } from '@/_types/request';

export const convertHeaders = (headers: RequestHeader[]) => {
  return headers
    .filter((h) => h.key.trim() !== '')
    .reduce<Record<string, string>>((acc, h) => {
      acc[h.key] = h.value;
      return acc;
    }, {});
};
