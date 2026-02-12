import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue, callBackSetItemLocalStorage = null, listDeps = []) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    if(typeof callBackSetItemLocalStorage == "function")
      callBackSetItemLocalStorage()
  }, [key, value, ...listDeps]);

  return [value, setValue];
}

export default useLocalStorage;