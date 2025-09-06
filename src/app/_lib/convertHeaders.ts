import { RequestHeader } from "app/[locale]/rest/page";

export const convertHeaders = (headers: RequestHeader[]) => {
  return headers.reduce<Record<string, string>>((acc, h) => {
    acc[h.key] = h.value;
    return acc;
  }, {});
};
