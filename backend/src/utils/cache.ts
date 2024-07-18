import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 }); // Cache items for 1 hour

export const getFromCache = (key: string) => {
  return cache.get(key);
};

export const setToCache = (key: string, value: any) => {
  cache.set(key, value);
};
