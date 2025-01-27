import { useRef } from 'react';
/** global hooks */

export function useRefStore(initialValue = {}) {
  const cache = useRef(initialValue);
  function set(key, value, reset) {
    if (!key) {
      console.error('need a key');
      return;
    }
    if (typeof key === 'object') {
      if (reset) {
        for (let k in cache.current) {
          if (k) {
            delete cache.current[k];
          }
        }
      }
      for (let k in key) {
        if (k) {
          cache.current[k] = key[k];
        }
      }
    } else {
      if (typeof value === 'undefined') {
        delete cache.current[key];
      } else {
        cache.current[key] = value;
      }
    }
  }
  return [cache.current, set];
}
