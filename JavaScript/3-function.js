'use strict';

const timeoutCollection = (interval) => {
  const collection = new Map();
  const timers = new Map();

  return {
    set(key, value) {
      const existingTimer = timers.get(key);
      if (existingTimer) clearTimeout(existingTimer);
      const timeout = setTimeout(() => collection.delete(key), interval);
      if (typeof timeout.unref === 'function') timeout.unref();
      collection.set(key, value);
      timers.set(key, timeout);
      return this;
    },
    get(key) {
      return collection.get(key);
    },
    delete(key) {
      const timer = timers.get(key);
      if (timer) {
        clearTimeout(timer);
        collection.delete(key);
        timers.delete(key);
      }
    },
    toArray() {
      return [...collection.entries()];
    }
  };
};

// Usage
const hash = timeoutCollection(1000);
hash.set('uno', 1);
console.dir({ array: hash.toArray() });

hash.set('due', 2);
console.dir({ array: hash.toArray() });

setTimeout(() => {
  hash.set('tre', 3);
  console.dir({ array: hash.toArray() });

  setTimeout(() => {
    hash.set('quattro', 4);
    console.dir({ array: hash.toArray() });
  }, 500);
}, 1500);
